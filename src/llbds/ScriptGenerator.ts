import path from "path";
import * as fs from "fs";
import * as packageJson from "../../package.json";
import { CodeGenerator, CommandNode, CommandTree, CommandTreeMode, EnumNode, FunctionNode, NodePtr, RootNode, VariableNode } from "../command/CommandTree";
import { BlockCode, ClassCode, Content, EXPORT, MethodCode, ScriptModule, ParameterCode, RegisterCode, SCRIPT_TYPE, StatementsCode, ScriptLang, ScriptCofing } from "./ScriptCode";
import { LLBDSTag } from "./Utils";

/**
 * Create LLSE's command register class code.
 */
export class ClassMaker {
    private _registerContents: RegisterCode;
    private _callbackMethod: MethodCode;
    private _otherMethods: MethodCode[];
    private _class: ClassCode;

    private _enumIdSet: Set<string> = new Set();
    private _varIdSet: Set<string> = new Set();
    private _enumNameSet: Set<string> = new Set();

    public tree: CommandTree;
    public className: string;
    public commandName: string;
    public callbacks: string[] = [];

    public static readonly types = SCRIPT_TYPE;

    /**
     * Constructor for the JSClass.
     * @param tree - CommandTree.
     * @param commandName - The name of the command.
     */
    constructor(tree: CommandTree, commandName: string) {
        this.tree = tree;
        this.commandName = commandName;

        const firstChar = commandName.charAt(0).toUpperCase();
        const restOfChars = commandName.toLowerCase().slice(1);
        this.className = firstChar + restOfChars + "CommandAbstract";

        this._registerContents = {
            head: new StatementsCode(),
            enum: new StatementsCode(),
            optional: new StatementsCode(),
            mandatory: new StatementsCode(),
            overload: new StatementsCode(),
        };
        this._callbackMethod = new MethodCode("");
        this._otherMethods = [];
        this._class = new ClassCode("", []);
    }

    /**
     * Traverses the callback for nodes.
     * @param node - The current node.
     * @param layer - The layer of the node.
     */
    private _callbackTraverse(node: NodePtr, parentContent: Content): void {
        if (node instanceof FunctionNode) {
            // get parameters of this branch
            const paramNodes = node.parameterChain();
            const parameters: ParameterCode[] = [];
            for (const node of paramNodes)
                parameters.push(new ParameterCode(node.name, node.type!, (node instanceof VariableNode)));

            const paramsString = parameters.map(param => `result.${param.name}`).join(", ");
            parentContent.add(new StatementsCode([`return this.${node.name}(${paramsString});`]));

            // add node to otherMethods
            this._otherMethods.push(new MethodCode(node.name, parameters, "any;", ["protected", "abstract"]));
            return ;
        }

        if (node!.childs.length == 1) {
            this._callbackTraverse(node!.childs[0], parentContent);
            return ;
        }

        let optionalNode = null;
        const mandatoryNodes = [];
        for (const child of node!.childs)
            if (child.isOptional)
                optionalNode = child;
            else
                mandatoryNodes.push(child);

        mandatoryNodes.forEach((child, index)=>{
            let fn = "else if";
            if (index == 0)
                fn = "if";
            const block = new BlockCode(`${fn} (result.${this.getID(child)})`);
            (<BlockCode>parentContent).add(block);
            this._callbackTraverse(child, block);
        });

        if (optionalNode) {
            const block = new BlockCode("else");
            (<BlockCode>parentContent).add(block);
            this._callbackTraverse(optionalNode, block);
        }
    }

    /**
     * Gets the ID of a CommandNode.
     * @param node - The CommandNode to get the ID for.
     * @returns The ID of the CommandNode.
     */
    protected getID(node: CommandNode): string {
        if ((node instanceof EnumNode) || (node instanceof RootNode))
            return "enum_" + node.name + (node.isOptional ? "_optional" : "_mandatory");
        else if (node instanceof VariableNode)
            return "var_" + node.name + (node.isOptional ? "_optional" : "_mandatory");
        else
            return (<FunctionNode>node).name;
    }

    /**
     * Sets the root of the command.
     */
    protected setRoot(): void {
        const tag = new LLBDSTag(this.tree.root.tag);
        const params = [`"${this.commandName}"`, ...tag.gets(
            ["description", "permission", "flag"],
            ["\"\"", "PermType.Any", "0x80"]
        )];
        this._registerContents.head.line(`const command = mc.newCommand(${params.join(", ")});`);
        const alias = this.tree.root.enums.slice(1);
        alias.forEach((name)=>{
            this._registerContents.head.line(`command.setAlias("${name}");`);
        });
    }

    /**
     * Sets an EnumNode.
     * @param node - The EnumNode to set.
     */
    protected setEnum(node: EnumNode): void {
        const tag = new LLBDSTag(node.tag);
        const id = this.getID(node);
        let name = tag.def(`"${node.name}"`).get("name");
        name = name.substring(1, name.length - 1);

        if (this._enumNameSet.has(name))
            return ;
        this._enumNameSet.add(name);

        if (this._enumIdSet.has(id))
            return ;
        this._enumIdSet.add(id);

        const enumsString = JSON.stringify(node.enums).replace(/,/g, ", ");
        this._registerContents.enum.line( `command.setEnum("${name}", ${enumsString});`);

        // command.xxx(name,type[,enumName,identifier,enumOptions])
        const params = [
            `"${name}"`, "ParamType.Enum", `"${name}"`,
            `"${id}"`, ...tag.gets(["enumOptions"], ["0"])
        ];
        const paramString = params.join(", ");
        if (node.isOptional)
            this._registerContents.optional.line(`command.optional(${paramString});`);
        else
            this._registerContents.mandatory.line(`command.mandatory(${paramString});`);
    }

    /**
     * Sets a VariableNode.
     * @param node - The VariableNode to set.
     */
    protected setVariable(node: VariableNode): void {
        if (!ClassMaker.types.includes(node.type!))
            throw new Error(`In LLSE, type must belong to ${ClassMaker.types}`);

        const id = this.getID(node);
        if (this._varIdSet.has(id))
            return;
        this._varIdSet.add(id);

        // command.xxx(name,type[,enumName,identifier,enumOptions])
        if (node.isOptional)
            this._registerContents.optional.line(`command.optional("${node.name}", ParamType.${node.type}, "", "${id}");`);
        else
            this._registerContents.mandatory.line(`command.mandatory("${node.name}", ParamType.${node.type}, "", "${id}");`);
    }

    /**
     * Sets overloads for the command.
     */
    protected setOverload(): void {
        this.tree.fnNodes.forEach((node)=>{
            this.callbacks.push(this.getID(node));
            const nodes = node.parameterChain();
            const params = nodes.map(node => this.getID(node));

            // check: there cannot be two identical name on the same chain
            const nameSet = new Set<string>();
            nodes.forEach((n)=>{
                const name = (<VariableNode | EnumNode>n).name;
                if (nameSet.has(name))
                    throw new Error("In LLSE, name cannot be duplicated in some branch");
                nameSet.add(name);
            });

            // command.overload(name,type[,enumName,identifier,enumOptions])
            this._registerContents.overload.line(`command.overload(${JSON.stringify(params).replace(/,/g, ", ")});`);
        });
    }

    /**
     * Sets the callback for the command.
     */
    protected setCallback(): void {
        // order: parent -> child -> sibling
        this._callbackTraverse(this.tree.root, this._callbackMethod);
    }

    /**
     * Get the single command class code.
     * @returns {string}
     */
    public code(): string {
        // init
        this._registerContents = {
            head: new StatementsCode(),
            enum: new StatementsCode(),
            optional: new StatementsCode(),
            mandatory: new StatementsCode(),
            overload: new StatementsCode(),
        };
        this._otherMethods = [];
        const parameters = [
            new ParameterCode("command", "Command"),
            new ParameterCode("origin", "CommandOrigin"),
            new ParameterCode("output", "CommandOutput"),
            new ParameterCode("result", "any")
        ];
        this._callbackMethod = new MethodCode("callback", parameters, "any", ["public"]);
        this._class = new ClassCode(this.className, ["abstract"]);

        // fill base code
        this.setRoot();
        for (const node of this.tree.enumNodes)
            this.setEnum(node);
        for (const node of this.tree.variableNodes)
            this.setVariable(node);
        this.setOverload();
        this.setCallback();

        // splice class
        const callbackBlock = new BlockCode("");
        callbackBlock.add(new StatementsCode(["this.callback(command, origin, output, result);"]));

        const registerMethod = new MethodCode("register", [], "boolean", ["public"]);
        registerMethod.add(this._registerContents.head)
            .add(this._registerContents.enum)
            .add(this._registerContents.optional)
            .add(this._registerContents.mandatory)
            .add(this._registerContents.overload)
            .add(new StatementsCode([
                "command.setCallback((command, origin, output, result) => {",
                ScriptCofing.IndentPattern + "this.callback(command, origin, output, result);",
                "});"
            ]))
            .add(new StatementsCode(["return command.setup();"]));

        this._class.addMethod(new MethodCode("constructor", [], ""))
            .addMethod(registerMethod)
            .addMethod(this._callbackMethod);
        for (const method of this._otherMethods)
            this._class.addMethod(method);

        return this._class.toString().slice(0, -1); // delete a \n
    }
}

export class ScriptGenerator extends CodeGenerator {
    /**
     * Generates code files to {@link distDir} from command {@link trees}.
     *
     * ### This method should not be used within asynchronous functions !!!
     *
     * @param trees - An array of CommandTree.
     * @param distDir - The directory to save the generated code files.
     * @param module - The module of export type (ES or CommonJS).
     * @defaultValue `Module.CommonJS`
     * @override {@link CodeGenerator}
     */
    public generate(trees: CommandTree[], distDir: string, language: ScriptLang = ScriptLang.JavaScript, module: ScriptModule = ScriptModule.CommonJS, indentNumber: number = 4): void {
        ScriptCofing.Language = language;
        ScriptCofing.IndentPattern = " ".repeat(indentNumber);

        const nameMap = new Map<string, number>();
        for (const tree of trees) {
            if (tree.mode != CommandTreeMode.STRICT)
                throw new Error(`Tree: ${tree.root.enums} must be a strict mode in LLSE`);
            // prevent duplicate name classes
            let cmdName = tree.root.enums[0];
            if (nameMap.has(cmdName)) {
                let i = nameMap.get(cmdName)!;
                cmdName += i!.toString();
                nameMap.set(cmdName, ++i);
            }
            else {
                nameMap.set(cmdName, 1);
            }

            // get class code text
            const maker = new ClassMaker(tree, cmdName);
            const classText = maker.code();

            // add comment and export
            const fileComment = `Generated by MineCDL(https://github.com/superx101/MineCDL) v${packageJson.version}\n\n${tree.toTreeString(4, true)}`;
            const classComment = "An abstract class of register command in LLSE\n@abstract";
            const exportText = EXPORT[module].replace("CLASSNAME", maker.className);

            // output
            const fileCode = new StatementsCode();
            fileCode.comment(fileComment)
                .line("")
                .comment(classComment)
                .line(classText)
                .line("")
                .line(exportText);
            const filePath = path.join(distDir, `${maker.className}.${ScriptCofing.Language}`);
            fs.mkdir(distDir, { recursive: true }, (mkdirError) => {
                if (mkdirError)
                    console.error(mkdirError);
                else
                    fs.writeFile(filePath, fileCode.toString(), (writeError) => {
                        if (writeError)
                            console.error(writeError);
                        else
                            console.log(`Successfully wrote file: ${filePath}`);
                    });
            });
        }
    }
}
