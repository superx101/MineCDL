# MineCDL

English | [简体中文](./README-CN.md)

MineCDL is a javascript/typescript library for custom command parsing or generating code for other platforms.

You can quickly define some commands use MCDL (MineCraft Command Definition Language) as :

```mcdl
tp | teleport
    <target>: Target << 1
        [target]
            f1()
        <pos>: PosInt << 3
            f2()
    <pos>
        f3()
    random | r
        f4()

alwaysday
    (true|false)
        f1()

help
    f1()
```

These three command trees are equivalent to these minecraft style statements below :

`tp <target: Target> [target: Target]`

`tp <target: Target> <pos: PosInt>`

`tp <pos: PosInt>`

`tp random`

`tp r`

`teleport <target: Target> [target: Target]`

`teleport <target: Target> <pos: PosInt>`

`teleport <pos: PosInt>`

`teleport random`

`teleport r`

`alwaysday`

`alwaysday true`

`alwaysday false`

`help`

## Installation

Run 

```shell
npm install minecdl
``` 

to install the library and all its dependecies.

## MCDL Syntax
Refer to the [documentation](https://superx101.github.io/MineCDL/)

## Command Parser

For command trees generated from MCDL, you can choose to parse them using the built-in command parser in this library, as demonstrated in the following code:

> For the complete example, please refer to [example.ts](https://github.com/superx101/MineCDL/blob/main/example/parser/example.ts) or [example.js](https://github.com/superx101/MineCDL/blob/main/example/parser/example.js).

```typescript
const parser = new CommandParser(trees[0]); // trees is contructed by CommandTreeBuilder
parser.recordLog = true;

parser
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
    .registerFunction("f1", (params, target1, target2)=> {
        // target1 and target2 is variable object you returned at tpParser.registerVarType
        console.log("f1", target1, target2)
    })
    .registerFunction("f2", (params, target, pos)=> {
        console.log("f2", target, pos)
    })
    .registerFunction("f3", (params, pos)=> {
        console.log("f3", pos)
    })
    .registerFunction("f4", (params, distance)=> {
        console.log("f4", params[1], distance)
    })

parser.errorListener = (error, logs, params)=> {
    console.log(error.message)
}
    
console.log(parser.parse("/tp @s @r"));         
// true f1 Target {tag: '@s'} Target {tag: '@r'}
console.log(parser.parse("/cmd1 @s @s"));       
// true f1 Target {tag: '@s'} Target {tag: '@s'}
console.log(parser.parse("/tp @s 10 20 30"));   
// true f2 Target {tag: '@s'} PosInt {x: 10, y: 20, z: 30}
    
parser.head = "#" // default value is "/"
parser.sepRegExp = "_+" // default value is " +"

console.log(parser.parse("#tp_10_20_30"))       
// true f3 PosInt {x: 10, y: 20, z: 30}
console.log(parser.parse("#tp_random"))         
// true f4
console.log(parser.parse("#tp_r"))              
// true f4
console.log(parser.parse("#tp______r"))         
// true f4
console.log(parser.parse("#tp_test"))           
// false Unable to match parameter >>_test<<
```

Alternatively, you can also use the corresponding code generator to generate instruction registration code for other platforms and languages.

> TODO: This section is not yet implemented.