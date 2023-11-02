(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{309:function(t,a,v){"use strict";v.r(a);var _=v(14),s=Object(_.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"命令解析器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#命令解析器"}},[t._v("#")]),t._v(" 命令解析器")]),t._v(" "),a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),a("p",[t._v("命令解析器是独立于MCDL的模块，使用命令树来解析《我的世界》格式的命令。本项目中使用MCDL解析器来生成命令树，如果你不想使用MCDL，也可以自己编写命令树生成器。")]),t._v(" "),a("h2",{attrs:{id:"命令树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#命令树"}},[t._v("#")]),t._v(" 命令树")]),t._v(" "),a("p",[t._v("命令树的格式与MCDL中定义的相同，由根节点、枚举、变量、处理函数组成。提供变量类型推断机制，自动补全没有定义类型的变量。")]),t._v(" "),a("p",[t._v("命令树是一种通用的中间结构，因此你也可以编写一个JSON的构建器来通过JSON生成命令树，然后编写一个生成器把命令树转化为java代码。")]),t._v(" "),a("h2",{attrs:{id:"命令树模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#命令树模式"}},[t._v("#")]),t._v(" 命令树模式")]),t._v(" "),a("p",[t._v("不是所有命令树都能很好地被解析，《我的世界》中常常使用一些固定参数来限定命令树的解析。\n例如 "),a("code",[t._v("scoreboard objectives")]),t._v(" 和 "),a("code",[t._v("scoreboard players")])]),t._v(" "),a("p",[t._v("而MineCDL中的命令树没有强制要求这些限定，而不限定的方式被叫做 "),a("code",[t._v("宽松模式")]),t._v("。相反，限定树格式的方式叫做 "),a("code",[t._v("严格模式")])]),t._v(" "),a("h3",{attrs:{id:"宽松模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#宽松模式"}},[t._v("#")]),t._v(" 宽松模式")]),t._v(" "),a("p",[t._v("非限定的方式带来了一定的灵活性。比如下面用MCDL描述的命令树中，仅输入 "),a("code",[t._v("test")]),t._v(" 时也会对 "),a("code",[t._v("f1")]),t._v(" 进行匹配。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("test\n    (a)\n        f1()\n    (b)\n        (c)\n            f2()\n")])])]),a("h3",{attrs:{id:"严格模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#严格模式"}},[t._v("#")]),t._v(" 严格模式")]),t._v(" "),a("p",[t._v("参考宽松模式中的MCDL，为了消除"),a("a",{attrs:{href:"#%E4%BA%8C%E4%B9%89%E6%80%A7%E9%97%AE%E9%A2%98"}},[t._v("二义性")]),t._v("，严格模式禁止了某个结点下存在多个可选结点。")]),t._v(" "),a("h2",{attrs:{id:"二义性问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二义性问题"}},[t._v("#")]),t._v(" 二义性问题")]),t._v(" "),a("p",[t._v("在命令解析过程中，一个参数可能对应多个分支，导致程序将不能很好地选择该进入那个分支\n，本项目把这种分支不确定称作二义性。")]),t._v(" "),a("h3",{attrs:{id:"可选参数二义性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#可选参数二义性"}},[t._v("#")]),t._v(" 可选参数二义性")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("提示")]),t._v(" "),a("p",[t._v("使用 严格模式 构建的树不会出现这个问题")])]),t._v(" "),a("p",[t._v("当某一个结点下存在多个可选分支时存在二义性。\n以下面的MCDL为例，输入 "),a("code",[t._v("test")]),t._v(" 时，"),a("code",[t._v("f1")]),t._v(" "),a("code",[t._v("f2")]),t._v(" "),a("code",[t._v("f3")]),t._v(" "),a("code",[t._v("f4")]),t._v(" 都可能被执行。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("test\n    [v]: Variable\n        f1()\n    (a)\n        f2()\n    (b)\n        f3()\n    (c)\n        (d)\n            f4()\n    <v>: Variable\n        f5()\n\n")])])]),a("h4",{attrs:{id:"解决方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解决方案"}},[t._v("#")]),t._v(" 解决方案")]),t._v(" "),a("p",[t._v("当前解析器采用 "),a("code",[t._v("枚举最小链优先策略")]),t._v(" 来解决这个二义性，即匹配深度最小的那个分支，本例中为 "),a("code",[t._v("f1")]),t._v(" "),a("code",[t._v("f2")]),t._v(" "),a("code",[t._v("f3")]),t._v("。")]),t._v(" "),a("p",[t._v("当分支相同时，优先匹配枚举。若此时还存在多个枚举，则匹配第一个定义的枚举，本例中则为 "),a("code",[t._v("f2")]),t._v(" 被匹配。")]),t._v(" "),a("p",[t._v("因此，你在定义MCDL时应当注意同个结点下不能存在多个可选结点。\n或者选择 "),a("code",[t._v("严格模式")]),t._v(" TODO 来让程序构建树时检查。")]),t._v(" "),a("h3",{attrs:{id:"变量二义性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#变量二义性"}},[t._v("#")]),t._v(" 变量二义性")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),a("p",[t._v("变量二义性不能被程序检查，往往在定义变量时很容易出现")])]),t._v(" "),a("p",[t._v("当某个结点下的多个变量结点间存在交集时，存在该二义性。\n以下面MCDL为例，当输入 "),a("code",[t._v("test 10")]),t._v(" 时，"),a("code",[t._v("number")]),t._v(" 和 "),a("code",[t._v("int")]),t._v(" 均可匹配。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("test\n    <number>: Number\n        f1()\n    <int>: Int\n        f2()\n")])])]),a("h4",{attrs:{id:"解决方案-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解决方案-2"}},[t._v("#")]),t._v(" 解决方案")]),t._v(" "),a("p",[t._v("命令解析器根据定义变量的先后顺序，匹配第一个符合条件的分支。\n本例中则匹配 "),a("code",[t._v("f1")]),t._v("。")]),t._v(" "),a("p",[t._v("如果你想匹配 "),a("code",[t._v("f2")]),t._v("，则需要把 int 定义在 number 上方。\n"),a("strong",[t._v("由此可得，在不确定变量间是否存在交集时，应当按照集合范围从上到下依次定义变量。或按一定的优先级定义")]),t._v("。")])])}),[],!1,null,null,null);a.default=s.exports}}]);