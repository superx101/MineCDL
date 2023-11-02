# LLBDS 代码生成器

## LLBDS

全称为 LiteLoaderBDS ( [https://github.com/LiteLDev/LiteLoaderBDSv2]() ), 基岩版专用服务器服务端插件加载器.

可用很多种语言为该加载器开发插件，目前 MineCDL 支持：`JS/TS` 语言的代码生成。


## 注意事项

LLBDS 有对应的命令注册规则，请注意遵守 

### 1. 类型限定

::: tip
定义类型时，不需要写前缀 `ParamType.` 直接写类型即可
:::

LLBDS 只能使用以下的变量类型，不得自定义。

| 命令参数类型	        |  含义          | 
| ------------- |:------------------:|
| ParamType.Bool | 布尔值参数 |
| ParamType.Int | 整数参数 |
| ParamType.Float | 浮点数参数 |
| ParamType.String | 字符串参数 |
| ParamType.Actor | 实体目标选择器参数 |
| ParamType.Player | 玩家目标选择器参数 |
| ParamType.BlockPos | 整数坐标参数 |
| ParamType.Vec3 | 浮点数坐标参数 |
| ParamType.RawText | 原始字符串参数(可包含特殊字符，如逗号空格，只能作为最后一个参数使用) |
| ParamType.Message	| 消息类型参数(同 /say 指令参数，会自动展开目标选择器等) |
| ParamType.JsonValue | JSON字符串参数 |
| ParamType.Item | 物品类型参数 |
| ParamType.Block | 方块类型参数 |
| ParamType.Effect | 效果类型参数 |
| ParamType.Enum | 枚举参数 |
| ParamType.SoftEnum | 可变枚举参数 |
| ParamType.ActorType | 实体类型参数 |
| ParamType.Command | 指令名称参数（仅供测试） |

### 2. 不能注册相同的根命令

::: warning
MineCDL不会对其检查，但LLBDS会抛出错误，请在定义命令树时注意此问题
:::

所有命令中根命令不能重复，且不能注册与原版执行相同的根命令。

例，下列命令均非法
```
test | tp
    f1()

cmd | test
    f1()
```

### 3. 结点名称不要重复

::: warning
MineCDL不会对其检查，但LLBDS会抛出错误，请在定义命令树时注意此问题
:::

形如下面的例子，若定义一个player变量和player的枚举。LLBDS会认为它们是同一个

例：
```
test
    player
        f1()
    <player>: Player
        f2()
```

#### 解决方案

在原生插件中：TODO

在脚本引擎中：对枚举结点使用标签 `@(name="your_name")` 对其改名。注意，修改后的名称也不能与任何已存在的结点名称相同

### 4. 同个分支中不能有相同名称结点

::: warning
MineCDL会对其检查，若出现这个问题，将抛出异常
:::

LLBDS 是根据变量名区分变量的，因此相同变量名会被认为是一个变量。

例
```
cmd
    <player>: Player
        <player>: Player
            f1()
```

### 5. 命令解析二义性

LLBDS 依附于基岩版原版命令解析，因此解析相对脆弱，容易产生二义性问题。例如下面的例子中，`Actor` 被认为是字符串，导致永远无法进入 `f2` 分支

```
errorcmd
    <target1>: Actor
        <target2>: Actor
            f1()
    random | r            # this branch will never matched
        f2()
```


## 原生插件标签规则

TODO


## 脚本引擎标签规则

### 根结点标签

在根结点中，你可以使用标签 

`@(description="introduction", permission=PermType.Any, flag=0x08)`

来指定命令注册参数，参数请见
[mc.newCommand(cmd,description\[,permission,flag,alias\])](https://docs.litebds.com/zh-Hans/#/LLSEPluginDevelopment/GameAPI/Command)。

可全不选或部分选择，若部分选择，其余项将会为默认值。

例
```
cmd        @(description="introduction", permission=PermType.Any, flag=0x08)     
    f1()
```

### 枚举标签

枚举中，你可以使用

`@(name="name", enumOptions=1)` 来指定枚举显示的名称，和是否展开枚举。

参数请见：
[Command.mandatory(name,type\[,enumName,identifier,enumOptions\])](https://docs.litebds.com/zh-Hans/#/LLSEPluginDevelopment/GameAPI/Command)


## C++

TODO


## C#

TODO


## Script (JS/TS)

### 使用说明

参考
[https://github.com/superx101/MineCDL/blob/main/example/generator_llbds/example.ts]()

使用 ScriptGenerator 访问命令树，并将代码生成到对应的目录。

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

程序会生成一个抽象类，该类中已经包含了注册代码和回调分支选择的代码。
此时，只需创建一个新类继承 TestCommandAbstract 即可，并在对应的分支名中写处理代码。

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
}

// main.js
const testCmd = new TestCommand();
testCmd.register();
```


## Lua

TODO


## Python

TODO