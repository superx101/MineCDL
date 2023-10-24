# LLBDS Code Generator

## LLBDS

The full name is LiteLoaderBDS ( [https://github.com/LiteLDev/LiteLoaderBDSv2]() ), a server-side plugin loader for Keystone Edition.

Plugins can be developed for this loader in many languages, currently MineCDL supports: `JS/TS` language code generation.


## Notes

LLBDS has corresponding command registration rules, please pay attention to observe them. 

### 1. Type qualification

::: tip
When defining a type, you don't need to write the prefix `ParamType.` You can just write the type directly.
:::

LLBDS can only use the following variable types, no customization is allowed.

| Command parameter type | meaning |
| -------- |:------------:|
| ParamType. Bool | Boolean parameter|
| ParamType. Int | Integer parameter|
| ParamType. Float | Floating point parameter|
| ParamType. String | String parameter|
| ParamType. Actor | Entity target selector parameter|
| ParamType. Player | Player target selector parameters|
| ParamType. BlockPos | Integer coordinate parameter|
| ParamType. Vec3 | Floating point coordinate parameter|
| ParamType. RawText | Raw string parameter (can contain special characters such as commas and spaces, and can only be used as the last parameter)|
|ParamType. Message | Message type parameter (the same as the/say instruction parameter, which will automatically expand the target selector, etc.)|
| ParamType. JsonValue | JSON string parameter|
| ParamType. Item | Item type parameter|
| ParamType. Block | Block type parameter|
| ParamType. Effect | Effect type parameter|
| ParamType. Enum | Enumeration parameters|
| ParamType. SoftEnum | Variable enumeration parameter|
| ParamType. ActorType | Entity type parameter|
| ParamType. Command | Instruction name parameter (for testing only)|

### 2. Cannot register the same root command

::: warning
MineCDL doesn't check for this, but LLBDS will throw an error.
Please pay attention to this when defining the command tree.
:::

The root command cannot be duplicated in all commands, and cannot register the same root command as the original execution.

For example, the following commands are illegal
```
test | tp
    f1()

cmd | test
    f1()
```

### 3. Don't duplicate node names.

::: warning
MineCDL doesn't check for this, but LLBDS throws an error, so please be aware of this when defining your command tree!
:::

If you define a player variable and a player enumeration as in the following example, LLBDS will consider them to be one and the same.

example:
```
test
    player
        f1()
    <player>: Player
        f2()
```

#### Solution

In the native plugin: TODO

In the scripting engine: rename the enumeration node with the tag `@(name="your_name")`. Note that the modified name cannot be the same as any existing node name either.

### 4. No node with the same name in the same branch.

::: warning
MineCDL checks for this and throws an exception if it occurs.
:::

LLBDS distinguishes variables by their names, so the same variable name will be recognized as a variable.

Example
```
cmd
    <player>: Player
        <player>: Player
            f1()
```

### 5. Command Parsing Duality

LLBDS relies on the original command parsing of the bedrock version, so parsing is relatively fragile and prone to duality problems. For example, in the following example, `Actor` is recognized as a string, which prevents you from ever branching to `f2`.

```
errorcmd
    <target1>: Actor
        <target2>: Actor
            f1()
    random | r            # this branch will never matched
        f2()
```


## Native plugin labeling rules

TODO


## Script Engine labeling rules

### Root node tags

In the root node, you can use the tag 

`@(description="introduction", permission=PermType.Any, flag=0x08)`

to specify command registration parameters, see
[mc.newCommand(cmd,description\[,permission,flag,alias\])](https://docs.litebds.com/zh-Hans/#/LLSEPluginDevelopment/GameAPI/Command).

Can be unchecked or partially selected, if partially selected, the rest of the items will be defaulted.

Example
```
cmd        @(description="introduction", permission=PermType.Any, flag=0x08)     
    f1()
```

### Enumeration tags

For enumerations, you can use

`@(name="name", enumOptions=1)` to specify the name of the enumeration display, and whether to expand the enumeration.

For parameters, see:
[Command.mandatory(name,type\[,enumName,identifier,enumOptions\])](https://docs.litebds.com/zh-Hans/#/LLSEPluginDevelopment/GameAPI/Command)


## C++

TODO


## C#

TODO


## Script (JS/TS)

### Instructions for use

Reference
[https://github.com/superx101/MineCDL/blob/main/example/generator_llbds/example.ts]()

Use ScriptGenerator to access the command tree and generate code to the corresponding directory.

```ts
import {CommandTreeBuilder, CommandTreeMode, McdlCommandTreeBuilder, LLBDS as LL} from "minecdl"
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
    // generator.generate(trees, dir + "/ts", LL.ScriptLang.TypeScript, LL.ScriptModule.ES);
}
else {
    console.log("error");
}
```

The program generates an abstract class that already contains the registration code and the code for the callback branch selection.
At this point, just create a new class that inherits TestCommandAbstract and write the processing code in the corresponding branch name.

```js
class TestCommand extends TestCommandAbstract {
    callback(command, origin, output, result) {  
        // determine origin ...
        const res = super.callback(command, origin, output, result);
        // if (res)
        //     output.success("...")
        // else
        //     output.error("...")
        // return res;
    }

    f1(player, players, pos) {
        log("f1", player, players, pos);
        // ...
    }
    
    f2(player, pos) {
        log("f2", player, pos);
        // ...
    }
    
    f4(other_o, number, hollow) {
        log("f4", other_o, number, hollow);
        // ...
    }
    
    f3(other_o, number, replace) {
        log("f3", other_o, number, replace);
        // ...
    }
    
    f5(other_o, block, item) {
        log("f5", other_o, block, item);
        // ...
    }
```


## Lua

TODO


## Python

TODO