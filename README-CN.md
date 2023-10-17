# MineCDL

[English](./README.md) | 简体中文

MineCDL 是一个 javascript/typescript 库，用于自定义命令解析或为其他平台生成代码。

您可以使用 MCDL（MineCraft Command Definition Language，MineCraft 命令定义语言）快速定义一些命令：

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

这三个命令树相当于下面这些 minecraft 风格的语句：

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

## 安装

运行

```shell
npm install minecdl
```

来安装该库及其所有依赖库。

## MCDL 语法
请参阅[文档](https://superx101.github.io/MineCDL/)

## 命令解析器

对于从 MCDL 生成的命令树，你可以选择使用本库内置的命令解析器进行解析，如下代码所示：

> 有关完整示例，请参阅 [example.ts](https://github.com/superx101/MineCDL/blob/main/example/parser/example.ts) 或 [example.js](https://github.com/superx101/MineCDL/blob/main/example/parser/example.js) 。

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

此外，您还可以使用相应的代码生成器生成其他平台和语言的指令注册代码。

> TODO: 此部分尚未实现。