import { NodePtr, RootNode } from "./CommandTree";

export class CommandError extends Error {
    constructor(msg: string, location?: string) {
        let head = "";
        if (location)
            head = `At {${location}}: `;
        super(head + msg);
        this.stack;
    }
}

export class TreeBuildError extends CommandError {
    constructor(msg: string, location?: string) {
        super(msg, location);
    }
}

export class NodeBuildError extends CommandError {
    constructor(msg: string, location?: string) {
        super(msg, location);
    }
}

export class RegisterError extends CommandError {
    constructor(msg: string, location?: string) {
        super(msg, location);
    }
}

export class NodeError extends CommandError {
    constructor(msg: string, ptr: NodePtr) {
        const stacks = [];
        while (ptr) {
            stacks.push(ptr.toString());
            ptr = ptr.parent;
        }
        const stackInfo = stacks.reverse().join(" -> ");
        super(msg, `node=${stackInfo}`);
    }
}

export class CommandSyntaxError extends CommandError {
    constructor(msg: string, location?: string) {
        super(msg, location);
    }
}