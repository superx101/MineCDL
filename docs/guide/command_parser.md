# Command parser

::: tip
Translated with www.DeepL.com/Translator
:::

## Introduction

The command parser is a separate module from MCDL that uses a command tree to parse commands in My World format. This project uses the MCDL parser to generate the command tree. If you don't want to use MCDL, you can also write your own command tree generator.

## Command tree

The format of the command tree is the same as that defined in MCDL, consisting of a root node, enumerations, variables, and handler functions. A variable type inference mechanism is provided to automatically complete variables of undefined types.

Command tree is a generic intermediate structure, so you can also write a JSON builder to generate the command tree from JSON, and then write a generator to convert the command tree to java code.

## Command tree modes

Not all command trees are parsed well, and My World often uses some fixed parameters to qualify the parsing of command trees.
For example, `scoreboard objectives` and `scoreboard players`. 

The command tree in MineCDL does not enforce these qualifications, and the way in which it is not qualified is called ``loose mode''. Instead, the way the tree is formatted is called ``strict mode''.

### Loose mode

The unqualified approach provides some flexibility. For example, in the following command tree described in MCDL, `f1` is also matched when only `test` is entered.

```
test
    (a)
        f1()
    (b)
        (c)
            f2()
```

### Strict mode

Referring to MCDL in loose mode, to eliminate [duality] (## duality problem), strict mode prohibits the existence of multiple optional nodes under a given node.

## Ambiguity

During instruction parsing, a single argument may correspond to more than one branch, resulting in a program that will not be able to make a good choice of which branch to go into
This project refers to this branching uncertainty as duality.

### Optional parameter duality

::: tip
Trees built using strict mode do not suffer from this problem.
:::

Duality exists when there are multiple optional branches under a node.
Take the following MCDL as an example, when typing `test`, `f1` `f2` `f3` `f4` may all be executed.

```
test
    [v]: Variable
        f1()
    (a)
        f2()
    (b)
        f3()
    (c)
        (d)
            f4()
    <v>: Variable
        f5()

```

#### Solution

The current parser resolves this dichotomy using the ``enumeration least chain first strategy``, i.e., it matches the branch with the least depth, in this case ``f1`` ``f2`` ``f3``.

When the branches are the same, the enumeration is matched first. If more than one enumeration exists at this point, the first defined enumeration is matched, in this case `f2` is matched.

Therefore, you should be careful not to have more than one optional node under the same node when defining the MCDL.
Alternatively, choose ``strict mode`` TODO to have the program check this when building the tree.

### Variable duality

::: warning
Variable duality cannot be checked by the program, and is often easily seen when defining variables.
:::

This duality exists when there is an intersection between multiple variable nodes under a given node.
For example, in the following MCDL, when `test 10` is entered, both `number` and `int` match.

```
test
    <number>: Number
        f1()
    <int>: Int
        f2()
```

#### Solution

The command parser matches the first branch that matches the condition based on the order in which the variables are defined.
In this case, it matches `f1`.

If you want to match `f2`, you need to define int above number.
** It follows from this that when you are not sure if there is an intersection between variables, you should define variables in order from top to bottom of the set range. Or define them in a certain order of priority**.