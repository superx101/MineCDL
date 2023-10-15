import { CommandNode, CommandTree, EnumNode, FunctionNode, NodePtr, VariableNode } from "./CommandTree";
import { RegisterError, CommandSyntaxError } from "./CommandError";

export type Variable = any
export type ErrorListener = (e: Error, logs: Log[], params: string[]) => void;
/**
 * parse string array to variable, return null if string is illegal format
*/
export type VariableConstructor = (subParams: string[]) => Variable | null;
export type FunctionCallback = (params: string[], ...args: any) => void;
export type Matches = [NodePtr, any]

export enum LogType {
    INFO,
    WARN,
    ERROR
}

export interface MatchResult {
    mandatorys: Matches[]
    optionals: Matches[]
}

export interface Log {
    type: LogType
    time: Date
    msg: string
}

export class CommandParser {
    private _varConstructorMap: Map<string, VariableConstructor> = new Map();
    private _fnCallbackMap: Map<string, FunctionCallback> = new Map();
    private _params: string[] = [];
    private _varTypeUninitSet: Set<string>;
    private _fnUninitSet: Set<string>;
    private _tree: CommandTree;
    private _rootEnums: string[];
    private _name: string;
    private _errorListener: ErrorListener = () => { };
    public logs: Log[] = [];
    public recordLog: boolean = false;
    public sepRegExp: string = " +";
    public head: string = "/";

    constructor(cmdTree: CommandTree) {
        this._tree = cmdTree;
        this._rootEnums = (<EnumNode>cmdTree.root).enums;
        this._name = this._rootEnums.join("|");
        this._fnUninitSet = new Set([...this._tree.fnNameSet]);
        this._varTypeUninitSet = new Set([...this._tree.varTypeSet]);
    }

    get name(): string {
        return this._name;
    }

    set errorListener(listener: ErrorListener) {
        this._errorListener = listener;
    }

    protected addLog(logType: LogType, msg: string): void {
        if (!this.recordLog) return ;
        this.logs.push({ time: new Date(), type: logType, msg: msg });
    }

    protected eatParam(params: string[], text: string, count: number): string {
        for (let i = 0; i < count; ++i) {
            const p = params.shift();

            // if start with separator, eat it
            const match = text.match(`^${this.sepRegExp}`);
            if (match) {
                const matchedPrefix = match[0];
                text = text.replace(matchedPrefix, "");
            }

            // eat param
            text = text.slice(p?.length);
        }
        return text;
    }

    protected matchEnum(fptr: NodePtr, paramStack: string[]): MatchResult {
        const enumNodes = <EnumNode[]>fptr!.childs.filter((child) => child instanceof EnumNode);
        const mandatory: Matches[] = [];
        const optional: Matches[] = [];
        for (const node of enumNodes) {
            if (node.isOptional && paramStack.length == 0)
                optional.push([node, null]);

            if (node.enums.includes(paramStack[0])) {
                mandatory.push([node, null]);
                return { mandatorys: mandatory, optionals: optional };
            }
        }
        return { mandatorys: mandatory, optionals: optional };
    }

    protected matchVariable(fptr: NodePtr, paramStack: string[]): MatchResult {
        const varNodes = <VariableNode[]>fptr!.childs.filter((child)=> child instanceof VariableNode);
        const mandatory: Matches[] = [];
        const optional: Matches[] = [];
        for (const node of varNodes) {
            if (node.isOptional && paramStack.length == 0) {
                optional.push([node, null]);
                continue;
            }
            if (node.parmCount > paramStack.length)
                continue;
            const params = paramStack.slice(0, node.parmCount < 0 ? paramStack.length : node.parmCount);
            const varConstructor = this._varConstructorMap.get(node.type!)!;
            const variable: Variable = varConstructor(params);
            if (variable != null)
                mandatory.push([node, variable]);
        }
        return { mandatorys: mandatory, optionals: optional };
    }

    protected match(remStr: string, paramStack: string[]): void {
        let fptr: NodePtr = new CommandNode();
        fptr.addChild(this._tree.root!);
        const variableArr: Variable[] = [];

        while (fptr!.childs.length > 0) {
            // match funtion
            if (fptr!.childs[0] instanceof FunctionNode)
                break;

            const { mandatorys: enumMandatorys, optionals: enumOptionals } = this.matchEnum(fptr, paramStack);
            const { mandatorys: varMandatorys, optionals: varOptionals } = this.matchVariable(fptr, paramStack);
            this.addLog(LogType.INFO, `Current parameter stack is: {${paramStack}}`);

            // match mandatory enum
            if (enumMandatorys.length > 0) {
                fptr = enumMandatorys[0][0];
                remStr = this.eatParam(paramStack, remStr, 1);
                this.addLog(LogType.INFO, `Match mandatory enum node: {${fptr!.text}}`);
                continue;
            }

            // match first mandatory variable
            if (varMandatorys.length > 0) {
                const varMan = varMandatorys[0];
                const ptr = <VariableNode>varMan[0];
                fptr = ptr;
                variableArr.push(varMan[1]);
                remStr = this.eatParam(paramStack, remStr, ptr.parmCount);
                this.addLog(LogType.INFO, `Match mandatory variable node: {${ptr.name}:${ptr.type}}`);
                continue;
            }

            // just match optional: find shortest branch
            let shortests: Matches[] = [];
            let minDepth = +Infinity;
            enumOptionals.concat(varOptionals).forEach((match)=>{
                const ptr = match[0];
                if (ptr!.depth < minDepth) {
                    shortests = [match];
                    minDepth = ptr!.depth;
                }
                else if (ptr!.depth == minDepth) {
                    shortests.push(match);
                }
            });

            // not match any params
            if (shortests.length == 0)
                throw new CommandSyntaxError(`Unable to match parameter >>${remStr}<<`);

            // if there are multiple shortest branches, choose the first one
            const match = shortests[0];
            const ptr = match[0];
            fptr = ptr;
            if (ptr instanceof VariableNode) {
                variableArr.push(match[1]);
                this.addLog(LogType.INFO, `Match optional variable node: {${ptr.name}:${ptr.type}}`);
            }
            else {
                this.addLog(LogType.INFO, `Match optional enum node: {${ptr!.text}}`);
            }
        }

        // run function
        const callback = this._fnCallbackMap.get((<FunctionNode>fptr!.childs[0]).name);
        callback!(this._params, ...variableArr);
    }

    public registerVarType(type: string, constructor: VariableConstructor): CommandParser {
        this._varConstructorMap.set(type, constructor);
        if (this._tree.varTypeSet.has(type))
            this._varTypeUninitSet.delete(type);
        else
            this.addLog(LogType.WARN, `No variable type: {${type}} in command`);
        return this;
    }

    public registerFunction(key: string, callback: FunctionCallback): CommandParser {
        this._fnCallbackMap.set(key, callback);
        if (this._tree.fnNameSet.has(key))
            this._fnUninitSet.delete(key);
        else
            this.addLog(LogType.WARN, `No function: {${key}} in command`);

        return this;
    }

    public testVarType(type: string, testParams: string[]): boolean {
        if (this._varTypeUninitSet.has(type)) {
            this.addLog(LogType.ERROR, `Variale type constructor: {${type}} is not registered`);
            return false;
        }
        const constructor = this._varConstructorMap.get(type);
        return constructor!(testParams) != null;
    }

    public parse(cmdText: string): boolean {
        this.addLog(LogType.INFO, `start parse command: ${cmdText}`);
        try {
            // check all variable and function are set
            for (const key of this._varTypeUninitSet)
                throw new RegisterError(`variable type constructor: {${key}} has not set, you need to initialize it`, this._name);
            for (const key of this._fnUninitSet)
                throw new RegisterError(`Function callback: {${key}} has not set, you need to initialize it`, this._name);

            // check command head
            if (!cmdText.startsWith(this.head))
                throw new CommandSyntaxError(`Command must start with: ${this.head}`);
            cmdText = cmdText.replace(new RegExp(`^${this.head}`), "");

            // get param array
            const params = cmdText.split(new RegExp(this.sepRegExp));
            if (params[0] == "")
                params.shift();
            this._params = [...params];

            this.match(cmdText, params);
        }
        catch (e) {
            this.addLog(LogType.ERROR, (<Error>e).message);
            this._errorListener(<Error>e, this.logs, this._params);
            return false;
        }
        return true;
    }
}