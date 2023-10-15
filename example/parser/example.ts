import { CommandParser, CommandTreeBuilder, CommandTreeMode, McdlCommandTreeBuilder } from "minecdl";
import { IsIn, IsInt, IsString, Min, validateSync } from "class-validator";

/*
if you want to use decorators, use need set experimentalDecorators=true
eg.
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
*/

class Target {
    @IsString()
    @IsIn(["@s", "@p", "@r", "@a", "@e"]) // use class-validator to help check parameters
    public tag: string;

    constructor(tag: string) {
        this.tag = tag;
    }
}

class PosInt {
    @Min(0)
    @IsInt()
    public x;

    @IsInt()
    @Min(0)
    public y;

    @IsInt()
    @Min(0)
    public z;

    constructor(texts: string[]) {
        this.x = parseInt(texts[0]);
        this.y = parseInt(texts[1]);
        this.z = parseInt(texts[2]);
    }
}

const mcdl =
    `
cmd1 | tp
    <target>: Target << 1
        [target]
            f1()
        <pos>: PosInt << 3
            f2()
    <pos>
        f3()
    (up|down)
        [distance]: Int << 1
            f4()
    random | r
        f5()
cmd2
    f1()
`;

const builder: CommandTreeBuilder = new McdlCommandTreeBuilder();
const trees = builder.build(mcdl, CommandTreeMode.STRICT, (e) => {
    console.error(e.message);
});

if (trees) {
    const tpParser = new CommandParser(trees[0]); // trees is contructed by CommandTreeBuilder
    tpParser.recordLog = true;

    tpParser
        .registerVarType("Target", (subParams)=>{
            // Check whether the parameters strings can match this type
            const target = new Target(subParams[0]); // Target is your own class you defined
            // If subParams is no match, return null; otherwise, return object
            return validateSync(target).length > 0 ? null : target;
        })
        .registerVarType("PosInt", (subParams)=>{
            const pos = new PosInt(subParams); // PosInt is your own class you defined
            return validateSync(pos).length > 0 ? null : pos;
        })
        .registerVarType("Int", (subParams)=>{
            if (/^[-+]?\d+$/.test(subParams[0]))
                return parseInt(subParams[0]);
            return null;
        })
        .registerFunction("f1", (params, target1, target2)=> {
            // target1 and target2 is variable object you returned at tpParser.registerVarType
            console.log("f1", target1, target2);
        })
        .registerFunction("f2", (params, target, pos)=> {
            console.log("f2", target, pos);
        })
        .registerFunction("f3", (params, pos)=> {
            console.log("f3", pos);
        })
        .registerFunction("f4", (params, distance)=> {
            console.log("f4", params[1], distance);
        })
        .registerFunction("f5", (params) => {
            console.log("f5");
        });

    tpParser.errorListener = (error, logs, params)=> {
        console.log(error.message);
    };

    console.log(tpParser.parse("/tp @s @r"));         // true f1 Target {tag: '@s'} Target {tag: '@r'}
    console.log(tpParser.parse("/cmd1 @s @s"));       // true f1 Target {tag: '@s'} Target {tag: '@s'}
    console.log(tpParser.parse("/tp @s 10 20 30"));   // true f2 Target {tag: '@s'} PosInt {x: 10, y: 20, z: 30}
    console.log(tpParser.parse("/tp @s -1 20 20"));   // false Unable to match parameter >>_-1_20_20<<

    tpParser.head = "#"; // default value is "/"
    tpParser.sepRegExp = "_+"; // default value is " +"

    console.log(tpParser.parse("#tp_10_20_30"));       // true f3 PosInt {x: 10, y: 20, z: 30}
    console.log(tpParser.parse("#tp_up_20"));          // true f4 up 20
    console.log(tpParser.parse("#tp_random"));         // true f5
    console.log(tpParser.parse("#tp_r"));              // true f5
    console.log(tpParser.parse("#tp______r"));         // true f5
    console.log(tpParser.parse("#tp_test"));           // false Unable to match parameter >>_test<<
}
