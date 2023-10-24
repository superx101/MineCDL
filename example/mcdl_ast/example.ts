import { CharStreams } from "antlr4ts/CharStreams";
import { CommonTokenStream } from "antlr4ts/CommonTokenStream";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { McdlCommandTreeBuilder, ParseNode } from "../../src/mcdl/Builder";
import { McdlLexer } from "../../src/mcdl/antlr/McdlLexer";
import { McdlParser } from "../../src/mcdl/antlr/McdlParser";

class TestBuilder extends McdlCommandTreeBuilder {
    public getNodes(ctx: ParseTree, node: ParseNode) {
        return this.getParseNode(ctx, node);
    }
}

const code = `
cmd1 | tp                      @(any text)
    <target>: Target << 1      @({name: "player", type: "player"})
        [target]               @(a=1,b="2")
            f1()
        <pos>: PosInt << 3
            f2()
    <pos>
        f3()
    (up|down)
        [distance]: Int << 1
            f4()

cmd2
    f1()
`;

const input = CharStreams.fromString(code);
const lexer = new McdlLexer(input);

const tokens = new CommonTokenStream(lexer);
const parser = new McdlParser(tokens);

const ctx = parser.program();
const ptr = new ParseNode("virtual root", "", []);
console.log(JSON.stringify(new TestBuilder().getNodes(ctx, ptr), null, 2));
// import fs from "fs";
// fs.writeFileSync(cwd + __dirname + "/ast_example.json", JSON.stringify(new TestBuilder().getNodes(ctx, ptr), null, 2));

