# MCDL

::: tip
Translated with www.DeepL.com/Translator
:::

## Introduction

MCDL is different from the project itself MineCDL, which is known as MineCraft Command Definition Language.
MineCDL contains the MCDL, as well as the My World command parser and object code generator.

## Structure

### Annotations

As with python comments, MCDL uses `#` to indicate a single line comment, and `"""` `"""` to indicate a multi-line comment, the contents of which will not be parsed.

> Example
> 
> \# This is a single line comment.
>
> """
> 
> This is a multi-line comment
>
> This is the second line
>
> """

### Indentation

Similar to python indentation, MCDL uses `TAB` or `4 spaces` to indicate indentation

::: warning
Indentation must be `TAB` or `4 spaces`. If 1-3 spaces are used, the parser will assume that there is no indentation, and the code will not be parsed as expected.
:::

### Trees and branches

An mcdl can contain many command trees, which are independent of each other (so you can define two identical command trees).

Each tree consists of a root node and several branches, each branch consists of several sub-branches, and there must be a function at the end of the branch that matches the branch and executes the corresponding program.

So the tree structure is as follows:

```
command1_rootNode
    Branch1 # consisting of multiple definition nodes
        Branch1_handler
    Branch2
        Sub-branch1
            Sub-branch1_handler
        Sub-branch2
            Sub-branch2_handler
    # ...
    Branch_n
        Branch_n_handler

command2_rootNode
    # ...
    # (same as command 1)

...
```

### Nodes

A branch consists of several nodes, each of which corresponds to a parameter in the command.

There are three types of nodes

- Enumerated
- Enumerations.
- Functions

## Enumeration Variable Function

### Enumerated nodes

#### Definition

An enumeration consists of English or numeric numbers that are used to match a fixed value.
> For example, the commands: `scoreboard objectives` and `scoreboard players`.

If you don't want to enter too many characters, you can give the enumeration an alias, separating multiple names with "`|`".
For example, the command `teleport` aliases `tp` and `t` are represented in MCDL as:
```text
teleport | tp | t

or

teleport|tp|t
```

#### Necessity

In the case of the command `fill <from: x y z> <to: x y z> <block> [destroy|hollow|keep|outline|replace]`, for example, the last parameter can often be omitted, and MCDL refers to such omitted parameters as optional parameters, and optional enumerated nodes as optional enumerations.

Using `()` to represent an optional enumeration, the above fill command can be expressed as follows

```
fill
    <from>: xyz << 3
        <to>: xyz << 3
            <block>: Block
                (destroy|hollow|keep|outline) # optional enumeration
                    f1()
                replace # Required enumeration
                    <block>: Block
                        f2()
```

### Variable nodes

#### Variable name necessity

Unlike enumerations, variables need to be explicitly written with necessity. Use `<>` to indicate a mandatory variable and `[]` to indicate an optional variable. Inside the parentheses is the variable name.

> e.g. \<mandatory\> \[optional\]

#### Type Declaration

A variable must have a type declaration, which defines the type of a variable and the number of arguments it takes. A type is defined by adding `: type name << number of arguments` to the variable name.

> For example, a common coordinate type in MC is defined in MCDL as a node with variable name pos, variable type IntPos, and variable argument 3.
> ```
> tp
>     <pos>: IntPos << 3
>         f1()
> ```

Note that if the number of arguments is 1, you can omit the definition of the number of arguments and write the type name directly

> Example
> ```
> tp
>     <player>: Player
>         f1()
> ```

#### Implicit variables and type inference

::: warning
This method only works on variables with the same name and type, and type inference is only valid within the same tree.
:::

If you have more than one variable of the same type, you can define a variable by writing only ``necessity`` and ``parameter name``, and the program will be analyzed to infer the type of the variable based on the existing type definitions.MCDL calls this an implicit variable definition.

> Example
> ```
> tp
>     <pos>: IntPos << 3
>         <pos>
>             f1()
> ```

### Function nodes

A function node is defined by `name()` and is used to define a handler function. The function is executed when the branch it is on is matched.

::: warning
Each branch is handled differently, so MCDL requires that there be no functions with the same name within the same tree, and that there be one and only one function per branch.

If your definition is not legal, the parser will report an error.
::: 

> Example
> ```
> cmd1 | c1
>     f1()
> 
> cmd2
>     branch1 | b1
>         f1()
>     branch2
>         f2()
> ```

## Epilogue

At this point, you have learned all the syntax of MCDL and can start using it.

However, if you want to define a complex directive, you may encounter some ambiguity, about which explanations will be given in [Ambiguity](./command_parser.md#ambiguity).
