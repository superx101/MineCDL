# 代码生成器

部分核心的命令注册机制相对复杂。

MineCDL提供了若干生成器来根据`命令树`生成对应的注册代码，用户只需要关心如何编写`回调函数`，无需手动编写命令注册代码。

同时，根据统一的命令树生成代码，有利于不同语言、不同核心间的功能移植。