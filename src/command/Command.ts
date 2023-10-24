import { CommandNode, CommandTree, EnumNode, FunctionNode, NodePtr, VariableNode } from "./CommandTree";
import { RegisterError, CommandSyntaxError } from "./CommandError";

export type Variable = any
export type ErrorListener = (e: Error, logs: Log[], params: string[]) => void;
/**
 * A function that constructs a Variable from an array of strings, returns null if the string is in an illegal format.
 */
export type VariableConstructor = (subParams: string[]) => Variable | null;

/**
 * A callback function for a command.
 */
export type FunctionCallback = (params: string[], ...args: any) => void;

/**
 * Represents a match between a NodePtr and a value.
 */
export type Matches = [NodePtr, any];

/**
 * Enumeration for different types of logs.
 */
export enum LogType {
    INFO,
    WARN,
    ERROR
}

/**
 * Represents the result of a match operation.
 */
export interface MatchResult {
    mandatorys: Matches[];
    optionals: Matches[];
}

/**
 * Represents a log entry.
 */
export interface Log {
    type: LogType;
    time: Date;
    msg: string;
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

    public get name(): string {
        return this._name;
    }

    public set errorListener(listener: ErrorListener) {
        this._errorListener = listener;
    }

    constructor(cmdTree: CommandTree) {
        this._tree = cmdTree;
        this._rootEnums = (<EnumNode>cmdTree.root).enums;
        this._name = this._rootEnums.join("|");
        this._fnUninitSet = new Set([...this._tree.fnNameSet]);
        this._varTypeUninitSet = new Set([...this._tree.varTypeSet]);
    }

    /**
     * Adds a log entry with the specified log type and message if log recording is enabled.
     * @param logType - The type of the log entry.
     * @param msg - The log message.
     */
    protected addLog(logType: LogType, msg: string): void {
        if (!this.recordLog) return ;
        this.logs.push({ time: new Date(), type: logType, msg: msg });
    }

    /**
     * Eats a specified number of parameters from the input and updates the remaining string.
     * @param params - The parameters array.
     * @param text - The input text.
     * @param count - The number of parameters to eat.
     * @returns The remaining text after eating the parameters.
     */
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

    /**
     * Matches an EnumNode against the parameter stack.
     * @param fptr - The NodePtr to match against.
     * @param paramStack - The parameter stack.
     * @returns The match result.
     */
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

    /**
     * Matches a VariableNode against the parameter stack.
     * @param fptr - The NodePtr to match against.
     * @param paramStack - The parameter stack.
     * @returns The match result.
     */
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

    /**
     * Matches the input text against the command tree.
     * @param remStr - The remaining input text.
     * @param paramStack - The parameter stack.
     */
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

    /**
     * Registers a variable type and its constructor.
     * @param type - The variable type to register.
     * @param constructor - The constructor function for the variable type.
     * @returns This CommandParser instance.
     */
    public registerVarType(type: string, constructor: VariableConstructor): CommandParser {
        this._varConstructorMap.set(type, constructor);
        if (this._tree.varTypeSet.has(type))
            this._varTypeUninitSet.delete(type);
        else
            this.addLog(LogType.WARN, `No variable type: {${type}} in command`);
        return this;
    }

    /**
     * Registers a function with its callback.
     * @param key - The function name to register.
     * @param callback - The callback function for the function.
     * @returns This CommandParser instance.
     */
    public registerFunction(key: string, callback: FunctionCallback): CommandParser {
        this._fnCallbackMap.set(key, callback);
        if (this._tree.fnNameSet.has(key))
            this._fnUninitSet.delete(key);
        else
            this.addLog(LogType.WARN, `No function: {${key}} in command`);

        return this;
    }

    /**
     * Tests a variable type constructor with test parameters.
     * @param type - The variable type to test.
     * @param testParams - The test parameters.
     * @returns True if the constructor is registered and the test succeeds, false otherwise.
     */
    public testVarType(type: string, testParams: string[]): boolean {
        if (this._varTypeUninitSet.has(type)) {
            this.addLog(LogType.ERROR, `Variale type constructor: {${type}} is not registered`);
            return false;
        }
        const constructor = this._varConstructorMap.get(type);
        return constructor!(testParams) != null;
    }

    /**
     * Parses a command string.
     * @param cmdText - The command string to parse.
     * @returns True if parsing is successful, false if an error occurs.
     */
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