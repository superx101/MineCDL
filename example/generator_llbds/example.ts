import {CommandTreeBuilder, CommandTreeMode, McdlCommandTreeBuilder, LLBDS as LL} from "../../src/index"
import * as fs from "fs"

const mcdl = fs.readFileSync(__dirname + "/commands.mcdl", "utf-8");
const builder: CommandTreeBuilder = new McdlCommandTreeBuilder();
const trees = builder.build(mcdl, CommandTreeMode.STRICT, (e) => {
    console.error(e.message);
});

if (trees) {
    const generator = new LL.ScriptGenerator()
    const dir = __dirname + "/command";
    generator.generate(trees, dir + "/js", LL.ScriptLang.JavaScript, LL.ScriptModule.CommonJS);
    generator.generate(trees, dir + "/ts", LL.ScriptLang.TypeScript, LL.ScriptModule.ES);
}
else {
    console.log("error");
}