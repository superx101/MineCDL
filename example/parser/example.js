const { CommandParser, McdlCommandTreeBuilder, CommandTreeMode } = require("minecdl")

class Target {
    constructor(text) {
        this.tag = text
    }
}
class PosInt {
    constructor(texts) {
        this.x = parseInt(texts[0])
        this.y = parseInt(texts[1])
        this.z = parseInt(texts[2])
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

cmd2
    f1()
`
const builder = new McdlCommandTreeBuilder()
const trees = builder.build(mcdl, CommandTreeMode.STRICT, (error) => {
    // Handling grammar errors
});

// If the build fails, trees is null
if (trees) {
    const tpParser = new CommandParser(trees[0])
    tpParser
        .registerVarType("Target", (subParams) => {
            const paramString = subParams[0]
            // Check whether the parameters strings can match this type
            if (paramString.includes("@e", "@a", "@r", "@p", "@s"))
                return new Target(paramString) // if match return variable object
            return null; // if not match, return null 
        })
        .registerVarType("PosInt", (subParams) => {
            if (isPosInt) // Omit parameter check code
                return new PosInt(subParams)
            return null;
        })
        .registerVarType("Int", (subParams) => {
            if (/^[-+]?\d+$/.test(subParams[0]))
                return parseInt(subParams[0]);
            return null;
        })
        .registerFunction("f1", (params, target1, target2) => {
            // target1 and target2 is variable object you returned at tpParser.registerVarType
            console.log("f1", target1, target2);
        })
        .registerFunction("f2", (params, target, pos) => {
            console.log("f2", target, pos);
        })
        .registerFunction("f3", (params, pos) => {
            console.log("f3", pos);
        })
        .registerFunction("f4", (params, distance) => {
            console.log("f4", params[1], distance);
        })
        .registerFunction("f5", (params) => {
            console.log("f5");
        });

    tpParser.errorListener = (error, logs, params) => {
        console.log(error.message);
    };

    console.log(tpParser.parse("/tp @s @r"));         // true f1 Target {tag: '@s'} Target {tag: '@r'}
    console.log(tpParser.parse("/cmd1 @s @s"));       // true f1 Target {tag: '@s'} Target {tag: '@s'}
    console.log(tpParser.parse("/tp @s 10 20 30"));   // true f2 Target {tag: '@s'} PosInt {x: 10, y: 20, z: 30}

    tpParser.head = "#"; // default value is "/"
    tpParser.sepRegExp = "_+"; // default value is " +"

    console.log(tpParser.parse("#tp_10_20_30"));       // true f3 PosInt {x: 10, y: 20, z: 30}
    console.log(tpParser.parse("#tp_up_20"));          // true f4 up 20
    console.log(tpParser.parse("#tp_random"));         // true f5
    console.log(tpParser.parse("#tp_r"));              // true f5
    console.log(tpParser.parse("#tp______r"));         // true f5
    console.log(tpParser.parse("#tp_test"));           // false Unable to match parameter >>_test<<
}
