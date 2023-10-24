# Code Generator

Some of the core command registration mechanisms are relatively complex.

MineCDL provides several generators to generate corresponding registration code according to the `command tree`, users only need to care about how to write `callback functions`, no need to manually write command registration code.

At the same time, generating code according to a unified command tree facilitates the porting of functions between different languages and cores.