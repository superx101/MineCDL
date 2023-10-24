import { CharStreams, DefaultErrorStrategy, RecognitionException, Recognizer, Token } from "antlr4ts";
import { CommonTokenStream } from "antlr4ts/CommonTokenStream";
import { ParseTree as ProgramContext } from "antlr4ts/tree/ParseTree";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { CommandNode, CommandTree, CommandTreeMode, EnumNode, FunctionNode, NodePtr, RootNode, CommandTreeBuilder, VariableNode } from "../command/CommandTree";
import { McdlLexer } from "./antlr/McdlLexer";
import { McdlParser } from "./antlr/McdlParser";
import { TreeBuildError } from "../command/CommandError";

export const Tag = "TagContext";
export const Indent = "IndentContext";
export const RootDeclare = "RootDeclareContext";
export const EnumDeclare = "EnumDeclareContext";
export const VariableDeclare = "VariableDeclareContext";
export const FunctionDeclare = "FunctionDeclareContext";
export const MandEnumDef = "MandEnumDefContext";
export const OptEnumDef = "OptEnumDefContext";
export const ExplicitVariableDef = "ExplicitVariableDefContext";
export const ImplicitVariableDef = "ImplicitVariableDefContext";
export const MandVaribaleDef = "MandVaribaleDefContext";
export const OptVariableDef = "OptVariableDefContext";
export const ImplicitTypeDef = "ImplicitTypeDefContext";
export const ExplicitTypeDef = "ExplicitTypeDefContext";
export const IntCount = "IntCountContext";
export const MultiCount = "MultiCountContext";

export class ParseNode {
    constructor(
        public type: string,
        public text: string,
        public children: ParseNode[]
    ) {}

    public child(n: number): ParseNode {
        return this.children[n];
    }

    public childFromEnd(n: number): ParseNode {
        return this.children[this.children.length - 1 - n];
    }
}

export class McdlCommandTreeBuilder extends CommandTreeBuilder {
    constructor() {
        super();
    }

    protected getParseNode(ctx: ProgramContext, node: ParseNode): ParseNode {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child instanceof TerminalNode)
                continue;
            node.children.push(new ParseNode(child.constructor.name, child.text, []));
            this.getParseNode(child, node.children[node.children.length - 1]);
        }
        return node;
    }

    protected findParent(rootPtr: NodePtr, fptr: NodePtr, layer: number): NodePtr {
        if (fptr == null)
            return rootPtr!;

        let fp: NodePtr = fptr;
        while (fp!.layer >= layer)
            fp = fp!.parent;

        return fp;
    }

    protected makeRootNode(pn: ParseNode): RootNode {
        return new RootNode(pn.text, this.makeEnumNode(pn).enums);
    }

    protected makeEnumNode(pn: ParseNode): EnumNode {
        const enumDef = pn.childFromEnd(0);
        const enums: string[] = [];
        let isOptional = false;

        if (enumDef.type == OptEnumDef)
            isOptional = true;

        for (const nameDef of enumDef.children)
            enums.push(nameDef.text);

        return new EnumNode(enumDef.text, enums, isOptional);
    }

    protected makeVariableNode(pn: ParseNode): VariableNode {
        const varDefPn = pn.childFromEnd(0); // Explicit or Implicit
        const varDefChildPn = varDefPn.child(0); // Mand or Opt
        const name = varDefChildPn.child(0).text;

        // has type define?
        let type: null | string = null;
        let countPn;
        let count = -1;
        if (varDefPn.type == ExplicitVariableDef) {
            const typeDef = varDefPn.child(1);
            type = typeDef.child(0).text;
            if (typeDef.type == ExplicitTypeDef) {
                countPn = typeDef.child(1);
                // count is mutil or limited
                if (countPn && countPn.type == IntCount)
                    count = parseInt(countPn.text);
            }
            else {
                count = 1;
            }
        }

        // is Mand or Opt
        let isOptional = false;
        if (varDefChildPn.type == OptVariableDef)
            isOptional = true;

        return new VariableNode(name, type, isOptional, count);
    }

    protected makeFunctionNode(pn: ParseNode): FunctionNode {
        return new FunctionNode(pn.childFromEnd(0).text);
    }

    protected getLayer(pn: ParseNode): number {
        return pn.children.filter((child) => child.type === Indent).length;
    }

    protected buildByAST(ctx: ProgramContext, mode: CommandTreeMode): CommandTree[] {
        const rootPtr: NodePtr = new CommandNode(); // a virtual ptr, point to rootNodes
        const trees: CommandTree[] = [];
        let fptr: NodePtr = rootPtr;

        const parseRoot = this.getParseNode(ctx,  new ParseNode("", "", []));
        parseRoot.children.forEach((pChild)=>{
            let node: NodePtr;

            switch (pChild.type) {
            case RootDeclare:
                node = this.makeRootNode(pChild);
                break;
            case EnumDeclare:
                node = this.makeEnumNode(pChild);
                break;
            case VariableDeclare:
                node = this.makeVariableNode(pChild);
                break;
            case FunctionDeclare:
                node = this.makeFunctionNode(pChild);
                break;
            case Tag:
                fptr!.tag = pChild.text.substring(2, pChild.text.length - 1);
                return;
            }

            const layer = this.getLayer(pChild);
            node!.layer = layer;

            // is not sub node, find parent
            if (layer <= fptr!.layer)
                fptr = this.findParent(rootPtr, fptr, layer);

            fptr!.addChild(node!);
            fptr = node!;
        });

        // get rootNode
        rootPtr.childs.forEach((rootNode) => {
            rootNode.parent = null;
            trees.push( new CommandTree(<RootNode>rootNode, mode));
        });
        return trees;
    }

    public build(code: string, mode: CommandTreeMode = CommandTreeMode.LOOSE, error?: (e: Error)=>void): CommandTree[] | null {
        try {
            code = code.replace(/ +$/gm, ""); // remove space after text for every line
            const lexer = new McdlLexer(CharStreams.fromString(code));
            const tokens = new CommonTokenStream(lexer);
            const parser = new McdlParser(tokens);

            parser.removeErrorListeners();
            parser.errorHandler = new class extends DefaultErrorStrategy {
                constructor() {
                    super();
                }
                public reportError(recognizer: Recognizer<any, any>, e: RecognitionException): void {
                    const token: Token = e.getOffendingToken()!;
                    const line = token.line;
                    const charPositionInLine = token.charPositionInLine;
                    const msg = e.message;

                    // Get the text from startIndex - 5 to stopIndex + 5
                    const startIndex = token.startIndex;
                    const stopIndex = token.stopIndex;
                    const context = code.substring(Math.max(0, startIndex - 5), Math.min(stopIndex + 5, code.length)).replace(/\n/g, "\\n");
                    throw new TreeBuildError(`Syntax error at line ${line}:${charPositionInLine} text:{${token.text}} context:{${context}} msg:{${msg}}`);
                }
            };
            return this.buildByAST(parser.program(), mode);
        }
        catch (e) {
            error?.(<Error>e);
            return null;
        }
    }
}