(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{313:function(t,a,v){"use strict";v.r(a);var s=v(14),_=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"mcdl"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mcdl"}},[t._v("#")]),t._v(" MCDL")]),t._v(" "),a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),a("p",[t._v("MCDL 与项目本身 MineCDL 不同，MCDL全称为MineCraft Command Definition Language（我的世界命令定义语言）。\n而MineCDL除了包含MCDL外，还有《我的世界》命令解析器和目标代码生成器。")]),t._v(" "),a("h2",{attrs:{id:"结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#结构"}},[t._v("#")]),t._v(" 结构")]),t._v(" "),a("h3",{attrs:{id:"注释"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#注释"}},[t._v("#")]),t._v(" 注释")]),t._v(" "),a("p",[t._v("与python注释一样，MCDL中使用 "),a("code",[t._v("#")]),t._v(" 表示一个单行注释，使用 "),a("code",[t._v('"""')]),t._v(" "),a("code",[t._v('"""')]),t._v(" 表示一个多行注释，注释中的内容将不会被解析。")]),t._v(" "),a("blockquote",[a("p",[t._v("例")]),t._v(" "),a("p",[t._v("# 这是一个单行注释")]),t._v(" "),a("p",[t._v('"""')]),t._v(" "),a("p",[t._v("这是一个多行注释")]),t._v(" "),a("p",[t._v("这是第二行")]),t._v(" "),a("p",[t._v('"""')])]),t._v(" "),a("h3",{attrs:{id:"缩进"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缩进"}},[t._v("#")]),t._v(" 缩进")]),t._v(" "),a("p",[t._v("与python缩进类似，MCDL使用 "),a("code",[t._v("TAB")]),t._v(" 或 "),a("code",[t._v("4个空格")]),t._v(" 表示缩进")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),a("p",[t._v("缩进一定是 "),a("code",[t._v("TAB")]),t._v(" 或 "),a("code",[t._v("4个空格")]),t._v("。如果使用 1-3个空格，将会被解析器认为没有缩进，导致代码解析与预期结果不符。")])]),t._v(" "),a("h3",{attrs:{id:"树和分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#树和分支"}},[t._v("#")]),t._v(" 树和分支")]),t._v(" "),a("p",[t._v("一个mcdl可以包含很多棵命令树，命令树间相互独立不会影响（因此你可以定义两个完全相同的命令树）。")]),t._v(" "),a("p",[t._v("每个命令树由一个根结点和多个分支构成，每个分支由多个子分支构成，并且分支末尾必须有一个函数，用于匹配到分支后执行相应的程序")]),t._v(" "),a("p",[t._v("所以树结构如下：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("命令1根结点\n    分支1（由多个定义结点构成）\n        分支1处理函数\n    分支2\n        子分支1\n            子分支1处理函数\n        子分支2\n            子分支2处理函数\n    ...\n    分支n\n        分支n处理函数\n\n命令2根结点\n    ...\n    （同命令1）\n\n...\n")])])]),a("h3",{attrs:{id:"结点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#结点"}},[t._v("#")]),t._v(" 结点")]),t._v(" "),a("p",[t._v("分支则由多个结点构成，每个结点对应命令中的一个参数")]),t._v(" "),a("p",[t._v("从类型上看，结点分为3种类型")]),t._v(" "),a("ul",[a("li",[t._v("枚举型")]),t._v(" "),a("li",[t._v("变量型")]),t._v(" "),a("li",[t._v("函数型")])]),t._v(" "),a("h2",{attrs:{id:"类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#类型"}},[t._v("#")]),t._v(" 类型")]),t._v(" "),a("h3",{attrs:{id:"枚举型结点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#枚举型结点"}},[t._v("#")]),t._v(" 枚举型结点")]),t._v(" "),a("h4",{attrs:{id:"定义"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#定义"}},[t._v("#")]),t._v(" 定义")]),t._v(" "),a("p",[t._v("枚举由英文或数字构成，用于匹配某个固定的值。")]),t._v(" "),a("blockquote",[a("p",[t._v("例如命令："),a("code",[t._v("scoreboard objectives")]),t._v(" 和 "),a("code",[t._v("scoreboard players")])])]),t._v(" "),a("p",[t._v('如果不想输入太长的字符，可以给枚举取一个别名，多个名称间用 "'),a("code",[t._v("|")]),t._v('" 隔开。\n比如命令 '),a("code",[t._v("teleport")]),t._v(" 别名 "),a("code",[t._v("tp")]),t._v(" 和 "),a("code",[t._v("t")]),t._v(" 在MCDL中表示为：")]),t._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("teleport | tp | t\n\n或\n\nteleport|tp|t\n")])])]),a("h4",{attrs:{id:"必要性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#必要性"}},[t._v("#")]),t._v(" 必要性")]),t._v(" "),a("p",[t._v("以命令 "),a("code",[t._v("fill <from: x y z> <to: x y z> <block> [destroy|hollow|keep|outline|replace]")]),t._v(" 为例，最后一个参数常常可以省略。MCDL将这种可以省略的参数称为可选参数，而可选的枚举型结点又称为可选枚举。")]),t._v(" "),a("p",[t._v("用 "),a("code",[t._v("()")]),t._v(" 来表示一个可选枚举，上述的fill命令可以表述为")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("fill\n    <from>: xyz << 3\n        <to>: xyz << 3\n            <block>: Block\n                (destroy|hollow|keep|outline) # 可选枚举\n                    f1()\n                replace # 必要枚举\n                    <block>: Block\n                        f2()\n")])])]),a("h3",{attrs:{id:"变量型结点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#变量型结点"}},[t._v("#")]),t._v(" 变量型结点")]),t._v(" "),a("h4",{attrs:{id:"变量名必要性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#变量名必要性"}},[t._v("#")]),t._v(" 变量名必要性")]),t._v(" "),a("p",[t._v("与枚举不同，变量需要明确的写出必要性。用 "),a("code",[t._v("<>")]),t._v(" 表示一个强制性变量，"),a("code",[t._v("[]")]),t._v(" 表示一个可选变量。括号内部则表示变量名。")]),t._v(" "),a("blockquote",[a("p",[t._v("例如 <mandatory> [optional]")])]),t._v(" "),a("h4",{attrs:{id:"类型声明"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#类型声明"}},[t._v("#")]),t._v(" 类型声明")]),t._v(" "),a("p",[t._v("一个变量必须有类型声明，类型声明定义了一个变量的类型和接收参数的个数。在变量名后加上 "),a("code",[t._v(": 类型名称 << 参数个数")]),t._v(" 的方式定义一个类型。")]),t._v(" "),a("blockquote",[a("p",[t._v("比如MC中常见的坐标类型，我们在MCDL中定义为一个变量名是pos，变量类型为IntPos，变量参数为3的结点")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("tp\n    <pos>: IntPos << 3\n        f1()\n")])])])]),t._v(" "),a("p",[t._v("请注意，如果参数个数为1，可以省略参数个数的定义，直接写类型名称")]),t._v(" "),a("blockquote",[a("p",[t._v("例")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("tp\n    <player>: Player\n        f1()\n")])])])]),t._v(" "),a("h4",{attrs:{id:"隐式变量与类型推断"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#隐式变量与类型推断"}},[t._v("#")]),t._v(" 隐式变量与类型推断")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),a("p",[t._v("此方法仅适用于相同变量名和类型的变量，且类型推断仅在同一棵树内有效。")])]),t._v(" "),a("p",[t._v("如果你有多个相同类型的变量，则可以只写 "),a("code",[t._v("必要性")]),t._v(" 和 "),a("code",[t._v("参数名")]),t._v(" 来定义一个变量，程序分析时会根据已有类型定义的变量来推断这个变量的类型。MCDL将这种写法称作隐式的变量定义。")]),t._v(" "),a("blockquote",[a("p",[t._v("例")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("tp\n    <pos>: IntPos << 3\n        <pos>\n            f1()\n")])])])]),t._v(" "),a("h3",{attrs:{id:"函数型结点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#函数型结点"}},[t._v("#")]),t._v(" 函数型结点")]),t._v(" "),a("p",[t._v("函数型结点用 "),a("code",[t._v("名称()")]),t._v(" 来定义，用于定义一个处理函数。当函数所在的分支被匹配时，执行这个函数。")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),a("p",[t._v("每个分支的处理不同，因此MCDL要求同一棵树内不得有相同名称的函数，且一个分支有且仅有一个函数。")]),t._v(" "),a("p",[t._v("如果你的定义不合法，解析器将会报错。")])]),t._v(" "),a("blockquote",[a("p",[t._v("例")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("cmd1 | c1\n    f1()\n\ncmd2\n    branch1 | b1\n        f1()\n    branch2\n        f2()\n")])])])]),t._v(" "),a("h3",{attrs:{id:"标签"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#标签"}},[t._v("#")]),t._v(" 标签")]),t._v(" "),a("p",[t._v("标签用于添加一些特殊信息。例如在生成器中使用标签指定某个结点的额外参数。")]),t._v(" "),a("p",[t._v("标签用 "),a("code",[t._v("@(内容)")]),t._v(" 表示，其中 "),a("code",[t._v("内容")]),t._v(" 为 非"),a("code",[t._v("( ) \\r \\n")]),t._v("的任意字符。")]),t._v(" "),a("blockquote",[a("p",[t._v("例")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('cmd                @(any text)\n    enum           @(name="en")\n        f1()\n')])])])]),t._v(" "),a("h2",{attrs:{id:"尾声"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#尾声"}},[t._v("#")]),t._v(" 尾声")]),t._v(" "),a("p",[t._v("至此，你已经学会了MCDL所有语法，可以开始使用MCDL了。")]),t._v(" "),a("p",[t._v("但是，如果你想定义一个复杂命令，可能会遇到一些二义性问题，关于这些问题将会在"),a("RouterLink",{attrs:{to:"/zh/guide/command_parser.html#二义性问题"}},[t._v("二义性问题")]),t._v("给出解释。")],1)])}),[],!1,null,null,null);a.default=_.exports}}]);