(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{307:function(e,a,t){"use strict";t.r(a);var n=t(14),s=Object(n.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"mcdl"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mcdl"}},[e._v("#")]),e._v(" MCDL")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Translated with www.DeepL.com/Translator")])]),e._v(" "),a("h2",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),a("p",[e._v("MCDL is different from the project itself MineCDL, which is known as MineCraft Command Definition Language.\nMineCDL contains the MCDL, as well as the My World command parser and object code generator.")]),e._v(" "),a("h2",{attrs:{id:"structure"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#structure"}},[e._v("#")]),e._v(" Structure")]),e._v(" "),a("h3",{attrs:{id:"annotations"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#annotations"}},[e._v("#")]),e._v(" Annotations")]),e._v(" "),a("p",[e._v("As with python comments, MCDL uses "),a("code",[e._v("#")]),e._v(" to indicate a single line comment, and "),a("code",[e._v('"""')]),e._v(" "),a("code",[e._v('"""')]),e._v(" to indicate a multi-line comment, the contents of which will not be parsed.")]),e._v(" "),a("blockquote",[a("p",[e._v("Example")]),e._v(" "),a("p",[e._v("# This is a single line comment.")]),e._v(" "),a("p",[e._v('"""')]),e._v(" "),a("p",[e._v("This is a multi-line comment")]),e._v(" "),a("p",[e._v("This is the second line")]),e._v(" "),a("p",[e._v('"""')])]),e._v(" "),a("h3",{attrs:{id:"indentation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#indentation"}},[e._v("#")]),e._v(" Indentation")]),e._v(" "),a("p",[e._v("Similar to python indentation, MCDL uses "),a("code",[e._v("TAB")]),e._v(" or "),a("code",[e._v("4 spaces")]),e._v(" to indicate indentation")]),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),a("p",[e._v("Indentation must be "),a("code",[e._v("TAB")]),e._v(" or "),a("code",[e._v("4 spaces")]),e._v(". If 1-3 spaces are used, the parser will assume that there is no indentation, and the code will not be parsed as expected.")])]),e._v(" "),a("h3",{attrs:{id:"trees-and-branches"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#trees-and-branches"}},[e._v("#")]),e._v(" Trees and branches")]),e._v(" "),a("p",[e._v("An mcdl can contain many command trees, which are independent of each other (so you can define two identical command trees).")]),e._v(" "),a("p",[e._v("Each tree consists of a root node and several branches, each branch consists of several sub-branches, and there must be a function at the end of the branch that matches the branch and executes the corresponding program.")]),e._v(" "),a("p",[e._v("So the tree structure is as follows:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("command1_rootNode\n    Branch1 # consisting of multiple definition nodes\n        Branch1_handler\n    Branch2\n        Sub-branch1\n            Sub-branch1_handler\n        Sub-branch2\n            Sub-branch2_handler\n    # ...\n    Branch_n\n        Branch_n_handler\n\ncommand2_rootNode\n    # ...\n    # (same as command 1)\n\n...\n")])])]),a("h3",{attrs:{id:"nodes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#nodes"}},[e._v("#")]),e._v(" Nodes")]),e._v(" "),a("p",[e._v("A branch consists of several nodes, each of which corresponds to a parameter in the command.")]),e._v(" "),a("p",[e._v("There are three types of nodes")]),e._v(" "),a("ul",[a("li",[e._v("Enumerated")]),e._v(" "),a("li",[e._v("Enumerations.")]),e._v(" "),a("li",[e._v("Functions")])]),e._v(" "),a("h2",{attrs:{id:"enumeration-variable-function"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enumeration-variable-function"}},[e._v("#")]),e._v(" Enumeration Variable Function")]),e._v(" "),a("h3",{attrs:{id:"enumerated-nodes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enumerated-nodes"}},[e._v("#")]),e._v(" Enumerated nodes")]),e._v(" "),a("h4",{attrs:{id:"definition"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#definition"}},[e._v("#")]),e._v(" Definition")]),e._v(" "),a("p",[e._v("An enumeration consists of English or numeric numbers that are used to match a fixed value.")]),e._v(" "),a("blockquote",[a("p",[e._v("For example, the commands: "),a("code",[e._v("scoreboard objectives")]),e._v(" and "),a("code",[e._v("scoreboard players")]),e._v(".")])]),e._v(" "),a("p",[e._v("If you don't want to enter too many characters, you can give the enumeration an alias, separating multiple names with \""),a("code",[e._v("|")]),e._v('".\nFor example, the command '),a("code",[e._v("teleport")]),e._v(" aliases "),a("code",[e._v("tp")]),e._v(" and "),a("code",[e._v("t")]),e._v(" are represented in MCDL as:")]),e._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("teleport | tp | t\n\nor\n\nteleport|tp|t\n")])])]),a("h4",{attrs:{id:"necessity"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#necessity"}},[e._v("#")]),e._v(" Necessity")]),e._v(" "),a("p",[e._v("In the case of the command "),a("code",[e._v("fill <from: x y z> <to: x y z> <block> [destroy|hollow|keep|outline|replace]")]),e._v(", for example, the last parameter can often be omitted, and MCDL refers to such omitted parameters as optional parameters, and optional enumerated nodes as optional enumerations.")]),e._v(" "),a("p",[e._v("Using "),a("code",[e._v("()")]),e._v(" to represent an optional enumeration, the above fill command can be expressed as follows")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("fill\n    <from>: xyz << 3\n        <to>: xyz << 3\n            <block>: Block\n                (destroy|hollow|keep|outline) # optional enumeration\n                    f1()\n                replace # Required enumeration\n                    <block>: Block\n                        f2()\n")])])]),a("h3",{attrs:{id:"variable-nodes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#variable-nodes"}},[e._v("#")]),e._v(" Variable nodes")]),e._v(" "),a("h4",{attrs:{id:"variable-name-necessity"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#variable-name-necessity"}},[e._v("#")]),e._v(" Variable name necessity")]),e._v(" "),a("p",[e._v("Unlike enumerations, variables need to be explicitly written with necessity. Use "),a("code",[e._v("<>")]),e._v(" to indicate a mandatory variable and "),a("code",[e._v("[]")]),e._v(" to indicate an optional variable. Inside the parentheses is the variable name.")]),e._v(" "),a("blockquote",[a("p",[e._v("e.g. <mandatory> [optional]")])]),e._v(" "),a("h4",{attrs:{id:"type-declaration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#type-declaration"}},[e._v("#")]),e._v(" Type Declaration")]),e._v(" "),a("p",[e._v("A variable must have a type declaration, which defines the type of a variable and the number of arguments it takes. A type is defined by adding "),a("code",[e._v(": type name << number of arguments")]),e._v(" to the variable name.")]),e._v(" "),a("blockquote",[a("p",[e._v("For example, a common coordinate type in MC is defined in MCDL as a node with variable name pos, variable type IntPos, and variable argument 3.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("tp\n    <pos>: IntPos << 3\n        f1()\n")])])])]),e._v(" "),a("p",[e._v("Note that if the number of arguments is 1, you can omit the definition of the number of arguments and write the type name directly")]),e._v(" "),a("blockquote",[a("p",[e._v("Example")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("tp\n    <player>: Player\n        f1()\n")])])])]),e._v(" "),a("h4",{attrs:{id:"implicit-variables-and-type-inference"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#implicit-variables-and-type-inference"}},[e._v("#")]),e._v(" Implicit variables and type inference")]),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),a("p",[e._v("This method only works on variables with the same name and type, and type inference is only valid within the same tree.")])]),e._v(" "),a("p",[e._v("If you have more than one variable of the same type, you can define a variable by writing only "),a("code",[e._v("necessity")]),e._v(" and "),a("code",[e._v("parameter name")]),e._v(", and the program will be analyzed to infer the type of the variable based on the existing type definitions.MCDL calls this an implicit variable definition.")]),e._v(" "),a("blockquote",[a("p",[e._v("Example")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("tp\n    <pos>: IntPos << 3\n        <pos>\n            f1()\n")])])])]),e._v(" "),a("h3",{attrs:{id:"function-nodes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#function-nodes"}},[e._v("#")]),e._v(" Function nodes")]),e._v(" "),a("p",[e._v("A function node is defined by "),a("code",[e._v("name()")]),e._v(" and is used to define a handler function. The function is executed when the branch it is on is matched.")]),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),a("p",[e._v("Each branch is handled differently, so MCDL requires that there be no functions with the same name within the same tree, and that there be one and only one function per branch.")]),e._v(" "),a("p",[e._v("If your definition is not legal, the parser will report an error.")])]),e._v(" "),a("blockquote",[a("p",[e._v("Example")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("cmd1 | c1\n    f1()\n\ncmd2\n    branch1 | b1\n        f1()\n    branch2\n        f2()\n")])])])]),e._v(" "),a("h3",{attrs:{id:"tags"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tags"}},[e._v("#")]),e._v(" Tags")]),e._v(" "),a("p",[e._v("Tags are used to add some special information. For example, a label is used in the generator to specify additional parameters for a node.")]),e._v(" "),a("p",[e._v("A label is represented by "),a("code",[e._v("@(content)")]),e._v(", where "),a("code",[e._v("content")]),e._v(" is any character other than "),a("code",[e._v("( ) \\r \\n")]),e._v(".")]),e._v(" "),a("blockquote",[a("p",[e._v("Example")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('cmd                @(any text)\n    enum           @(name="en")\n        f1()\n')])])])]),e._v(" "),a("h2",{attrs:{id:"epilogue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#epilogue"}},[e._v("#")]),e._v(" Epilogue")]),e._v(" "),a("p",[e._v("At this point, you have learned all the syntax of MCDL and can start using it.")]),e._v(" "),a("p",[e._v("However, if you want to define a complex directive, you may encounter some ambiguity, about which explanations will be given in "),a("RouterLink",{attrs:{to:"/guide/command_parser.html#ambiguity"}},[e._v("Ambiguity")]),e._v(".")],1)])}),[],!1,null,null,null);a.default=s.exports}}]);