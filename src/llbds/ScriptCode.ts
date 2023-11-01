export type Content = StatementsCode | BlockCode;

export enum ScriptLang {
    JavaScript = "js",
    TypeScript = "ts"
}

export enum ScriptModule {
    CommonJS,
    ES
}

export const SCRIPT_TYPE_MAP: {[key: string]: string} = {
    "Bool": "boolean",
    "Int": "number",
    "Float": "number",
    "String": "string",
    "Actor": "LLSE_Entity[]",
    "Entity": "LLSE_Entity[]",
    "Player": "LLSE_Player[]",
    "BlockPos": "IntPos",
    "Vec3": "FloatPos",
    "RawText": "string",
    "Message": "string",
    "JsonValue": "string",
    "Item": "LLSE_Item",
    "Block": "LLSE_Block",
    "Effect": "string",
    "Enum": "string",
    "SoftEnum": "string",
    "ActorType": "string",
    "Command": "string"
};

export const SCRIPT_TYPE = Object.keys(SCRIPT_TYPE_MAP);

export const EXPORT = [
    "module.exports = CLASSNAME;",
    "export { CLASSNAME };"
];

export interface RegisterCode {
    head: StatementsCode
    enum: StatementsCode
    optional: StatementsCode
    mandatory: StatementsCode
    overload: StatementsCode
}

export class ScriptCofing {
    public static Language = ScriptLang.JavaScript;
    public static IndentPattern = "    ";
}

export class TypeUtil {
    public static readonly tsPrefixSet: Set<string> = new Set([
        "public",
        "protected",
        "private",
        "abstract"
    ]);

    public static SetType(text: string, type: string = ""): string {
        if (ScriptCofing.Language == ScriptLang.JavaScript || type == "")
            return text;
        return text + ": " + type;
    }

    public static SetPrefix(text: string, prefixs: string[]) {
        let preString = "";
        for (const prefix of prefixs)
            if (ScriptCofing.Language != ScriptLang.TypeScript && TypeUtil.tsPrefixSet.has(prefix))
                continue;
            else
                preString += prefix + " ";
        return preString + text;
    }
}

export class ParameterCode {
    constructor(
        public name: string,
        public type: string = "",
        public optional: boolean = false,
        public convert: boolean = false
    ) {
        if (convert && type != "")
            this.type = SCRIPT_TYPE_MAP[type];
    }

    /** @override  */
    public tostring(): string {
        const type = this.type + (this.optional ? " | undefined" : "");
        return TypeUtil.SetType(this.name, type);
    }
}

export class StatementsCode {
    constructor(
        public lines: string[] = [],
        public indentNum: number = 0
    ) { }

    public setIndent(num: number) {
        this.indentNum = num + 1;
    }

    public add(statements: StatementsCode): StatementsCode {
        this.lines.push(...statements.lines);
        return this;
    }

    public line(line: string): StatementsCode {
        this.lines.push(line);
        return this;
    }

    public comment(text: string): StatementsCode {
        text = text
            .split("\n")
            .map(line => " * " + line)
            .join("\n");

        this.lines.push(`/**\n${text}\n */`);
        return this;
    }

    /** @override */
    public toString(): string {
        const indenet = ScriptCofing.IndentPattern.repeat(this.indentNum);
        let text = indenet + this.lines[0] + "\n";
        for (let i = 1; i < this.lines.length; ++i)
            text += indenet + this.lines[i] + "\n";
        return text;
    }
}

export class BlockCode {
    public indentNum: number = 0;
    public contents: Content[] = [];
    public head: string = "";
    public start = "{";
    public end = "}";

    constructor(head: string) {
        this.head = head;
    }

    public setIndent(num: number) {
        this.indentNum = num + 1;
        for (const content of this.contents)
            content.setIndent(this.indentNum);
    }

    public add(content: Content) {
        this.contents.push(content);
        content.setIndent(this.indentNum);
        return this;
    }

    public adds(contents: Content[]) {
        for (const content of contents)
            this.add(content);
        return this;
    }

    /** @override */
    public toString(): string {
        let text = "";
        const indent = ScriptCofing.IndentPattern.repeat(this.indentNum);
        text = indent + `${this.head}`;
        if (this.contents.length == 0)
            return text + ` ${this.start}${this.end}\n`;
        text += ` ${this.start}\n`;
        for (const content of this.contents)
            text += content.toString();
        text += indent + `${this.end}\n`;
        return text;
    }
}

export class MethodCode extends BlockCode {
    constructor(methodName: string, parameters: ParameterCode[] = [], returnType: string = "", prefixs: string[] = []) {
        const paramString = parameters.map((v) => v.tostring()).join(", ");
        const type = TypeUtil.SetType(`${methodName}(${paramString})`, returnType);
        const head = TypeUtil.SetPrefix(type, prefixs);
        super(head);
        if (ScriptCofing.Language == ScriptLang.TypeScript && prefixs.includes("abstract")) {
            this.start = "";
            this.end = "";
        }
    }
}

export class ClassCode extends BlockCode {
    public attributes: StatementsCode[] = [];
    public methods: MethodCode[] = [];

    constructor(name: string, prefixs: string[] = []) {
        super(TypeUtil.SetPrefix(`class ${name}`, prefixs));
    }

    public addMethod(method: MethodCode) {
        this.methods.push(method);
        return this;
    }

    public addAttribute(attribute: StatementsCode) {
        this.attributes.push(attribute);
        return this;
    }

    /** @override */
    public toString(): string {
        for (const attribute of this.attributes)
            super.add(attribute);
        for (const method of this.methods) {
            super.add(new StatementsCode([""]));
            super.add(method);
        }
        return super.toString();
    }
}

