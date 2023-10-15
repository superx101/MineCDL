import { NodeError } from "./CommandError";

export type NodePtr = CommandNode | null

export enum CommandTreeMode {
    LOOSE,
    STRICT
}

export class CommandNode {
    public childs: CommandNode[] = [];
    public parent: NodePtr = null;
    public layer: number = -1;
    public depth: number = 0;
    public text: string;
    public isOptional: boolean;

    constructor(text: string = "", isOptinal: boolean = false) {
        this.text = text;
        this.isOptional = isOptinal;
    }

    public addChild(child: CommandNode): void {
        child.parent = this;
        this.childs.push(child);
    }

    public toString(): string {
        return "";
    }
}

export class EnumNode extends CommandNode {
    public enums: string[];

    constructor(text: string, enums: string[], isOptional: boolean = false) {
        super(text, isOptional);
        this.enums = enums;
    }

    public toString(): string {
        if (this.isOptional)
            return `(${this.enums.join("|")})`;
        else
            return this.enums.join("|");
    }
}

export class RootNode extends EnumNode {
    constructor(text: string, enums: string[]) {
        super(text, enums, false);
        this.enums = enums;
    }
}

export class VariableNode extends CommandNode {
    public name: string;
    public type: string | null;
    public parmCount: number;

    constructor(name: string, type: string | null, isOptional = false, parmCount: number = -1) {
        super(name, isOptional);
        this.name = name;
        this.type = type;
        this.parmCount = parmCount;
    }

    public toString(): string {
        let name;
        if (this.isOptional)
            name = `[${this.name}]`;
        else
            name = `<${this.name}>`;
        let countStr: string = "...";
        if (this.parmCount > 0)
            countStr = this.parmCount.toString();
        return `${name}:${this.type}<<${countStr}`;
    }
}

export class FunctionNode extends CommandNode {
    public name: string = "";

    constructor(name: string) {
        super(name, false);
        this.name = name;
    }

    public toString(): string {
        return `${this.name}()`;
    }
}

export class CommandTree {
    private _mode: CommandTreeMode;
    public fnMap: Map<string, FunctionNode> = new Map();
    public varTypeSet: Set<string> = new Set();
    public fnNameSet: Set<string>;
    public root: RootNode;

    constructor(root: RootNode, mode: CommandTreeMode = CommandTreeMode.LOOSE) {
        this.root = root;
        this._mode = mode;

        const implicitVarArr: VariableNode[] = [];
        const explicitVarMap: Map<string, VariableNode> = new Map();

        // init
        this.traverse(this.root, (node)=>{
            if (node instanceof VariableNode) {
                if (node.type) {
                    this.varTypeSet.add(node.type);
                    explicitVarMap.set(node.name, node);
                }
                else {
                    implicitVarArr.push(node);
                }
            }
            else if (node instanceof FunctionNode) {


                // Update the depth value of the current branch
                let fptr: NodePtr = node.parent;
                let deepCount = 1;
                while (fptr) {
                        fptr!.depth = deepCount;
                        ++deepCount;
                        fptr = fptr!.parent;
                }
            }
        });

        // TypeInference
        if (implicitVarArr.length > 0)
            implicitVarArr.forEach((varNode)=>{
                if (!explicitVarMap.has(varNode.name))
                    throw new NodeError(`No type definition found for implicit variable:{${varNode.name}}`, varNode);
                const ptr = explicitVarMap.get(varNode.name)!;
                varNode.type = ptr.type;
                varNode.parmCount = ptr.parmCount;
            });

        // check
        this.traverse(this.root, (node) => {
            this.syntaxCheck(node);

            if (node instanceof FunctionNode)
                this.fnMap.set(node.name, node);
        });
        this.fnNameSet = new Set(this.fnMap.keys());
    }

    protected syntaxCheck(node: NodePtr): void {
        const parent = node!.parent;
        if (node instanceof FunctionNode) {
            // function must be a leaf node
            if (node.childs.length != 0)
                throw new NodeError("Function node must be leaf in tree", node);
            // Functions cannot have duplicate names
            if (this.fnMap.has(node.name))
                throw new NodeError("Function cannot have duplicate names", node);
        }
        else {
            // Enum and Variable's common check
            // have function node
            if (node!.childs.length == 0)
                throw new NodeError("After command definition was completed, must definite a function after node for callback", node);
            // optional is behind mandatory
            if (!node!.isOptional && parent && parent.isOptional)
                throw new NodeError(`Mandatory node {${node!.text}} cannot follow optional node {${parent.text}}`, node);
            // Strict mode
            if (this._mode == CommandTreeMode.STRICT) {
                // optional cannot have optional sibling
                const siblings = parent?.childs.filter((child)=> child.isOptional);
                if (siblings && siblings.length > 1)
                    throw new NodeError("[Strict Mode] Optional node cannot have other optional siblings", node);
            }

            if (node instanceof VariableNode) {
                // mutli parameters variable is leaf
                if (node.parmCount < 0 && node.childs.length > 1)
                    throw new NodeError("Mutli parameters variable must be leaf node except function", node);
                // cannot have sibling nodes of same type
                const varSiblings = <VariableNode[]>parent?.childs.filter((child)=>child instanceof VariableNode);
                const typeSet = new Set<string>();
                varSiblings!.forEach((node)=>{
                    if (typeSet.has(node.type!))
                        throw new NodeError("Variable node cannot have sibling nodes of same type", node);
                });
            }

        }
        // enum node cannot have sibling node of same enum
        const enumSet = new Set<string>();
        const enumSiblings = <EnumNode[]>node?.childs.filter((child)=>child instanceof EnumNode);
        for (const node of enumSiblings)
            node.enums.forEach((en)=>{
                if (enumSet.has(en))
                    throw new NodeError("Same enumeration exists under node", node);
                else
                    enumSet.add(en);
            });
    }

    public traverse(node: NodePtr, callback: (node: NodePtr)=>void): void {
        callback(node);

        node?.childs.forEach((child) => {
            this.traverse(child, callback);
        });
    }

    public toSingleBranchString(functionName: string): string {
        if (!this.fnNameSet.has(functionName)) return "";
        let ptr = this.fnMap.get(functionName)!.parent;
        const texts: string[] = [];

        while (ptr) {
            let content = "";
            if (ptr instanceof VariableNode) {
                content = `${ptr.name}: ${ptr.type}`;
                if (ptr.isOptional)
                    content = `[${content}]`;
                else
                    content = `<${content}>`;
            }
            else if (ptr instanceof EnumNode) {
                content = ptr.enums.join("|");
                if (ptr.isOptional)
                    content = `[${content}]`;
            }
            texts.push(content);
            ptr = ptr!.parent;
        }
        return texts.reverse().join(" ");
    }

    public toTreeString(layerCount: number = 4): string {
        const spaceStr = " ".repeat(layerCount);
        let output = "";
        this.traverse(this.root, (ptr)=>{
            if (ptr instanceof FunctionNode) return;
            output += spaceStr.repeat(ptr!.layer) + ptr!.toString() + "\n";
        });
        return output;
    }

    public toString(): string {
        let output = "";
        this.traverse(this.root, (ptr)=>{
            output += `${"  ".repeat(ptr!.layer)} ${ptr!.constructor.name} -> ${ptr!.text} opt=${ptr!.isOptional} parent=${ptr!.parent?.text}\n`;
        });
        return output;
    }
}

export abstract class CommandTreeBuilder {
    public abstract build(sourse: any, mode: CommandTreeMode, error?: (e: Error)=>void): CommandTree[] | null;
}