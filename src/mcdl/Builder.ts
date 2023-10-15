import { CharStreams, DefaultErrorStrategy, RecognitionException, Recognizer, Token } from "antlr4ts";
import { CommonTokenStream } from "antlr4ts/CommonTokenStream";
import { ParseTree as ProgramContext } from "antlr4ts/tree/ParseTree";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { CommandNode, CommandTree, CommandTreeMode, EnumNode, FunctionNode, NodePtr, RootNode, CommandTreeBuilder, VariableNode } from "../command/CommandTree";
import { McdlLexer } from "./antlr/McdlLexer";
import { McdlParser } from "./antlr/McdlParser";
import { TreeBuildError } from "../command/CommandError";

export class ParseNode {
    constructor(public type: string, public text: string, public children: ParseNode[]) {}

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

        if (enumDef.type == "OptEnumDefContext")
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
        if (varDefPn.type == "ExplicitVariableDefContext") {
            const typeDef = varDefPn.child(1);
            type = typeDef.child(0).text;
            if (typeDef.type == "ExplicitTypeDefContext") {
                countPn = typeDef.child(1);
                // count is mutil or limited
                if (countPn && countPn.type == "IntCountContext")
                    count = parseInt(countPn.text);
            }
            else {
                count = 1;
            }
        }

        // is Mand or Opt
        let isOptional = false;
        if (varDefChildPn.type == "OptVariableDefContext")
            isOptional = true;

        return new VariableNode(name, type, isOptional, count);
    }

    protected makeFunctionNode(pn: ParseNode): FunctionNode {
        return new FunctionNode(pn.childFromEnd(0).text);
    }

    protected getLayer(pn: ParseNode): number {
        return pn.children.filter((child) => child.type === "IndentContext").length;
    }

    protected buildByAST(ctx: ProgramContext, mode: CommandTreeMode): CommandTree[] {
        const rootPtr: NodePtr = new CommandNode(); // a virtual ptr, point to rootNodes
        const trees: CommandTree[] = [];
        let fptr: NodePtr = rootPtr;

        const parseRoot = this.getParseNode(ctx,  new ParseNode("", "", []));
        parseRoot.children.forEach((pChild)=>{
            let node: NodePtr;

            switch (pChild.type) {
            case "RootDeclareContext":
                node = this.makeRootNode(pChild);
                break;
            case "EnumDeclareContext":
                node = this.makeEnumNode(pChild);
                break;
            case "VariableDeclareContext":
                node = this.makeVariableNode(pChild);
                break;
            case "FunctionDeclareContext":
                node = this.makeFunctionNode(pChild);
                break;
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