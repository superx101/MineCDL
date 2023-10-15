import { error, log } from "console";
import { CommandParser } from "../../src/command/Command";
import { CommandTreeBuilder, CommandTreeMode } from "../../src/command/CommandTree";
import { McdlCommandTreeBuilder } from "../../src/mcdl/Builder";

class IntType {
    constructor(public value: number) {}
}

class NumberType {
    constructor(public value: number) {}
}

describe("command parser", ()=>{
    it.skip("Mandatory ambiguity 1", ()=>{
        let result;
        const mcdl = `
        test
            <int>: Int
                    f1()
            <num>: Number
                    f2()
        `;
        const builder: CommandTreeBuilder = new McdlCommandTreeBuilder();
        const trees = builder.build(mcdl, CommandTreeMode.STRICT, (e)=>{
            error(e);
        });
        expect(trees).not.toBeNull();
        const parser = new CommandParser(trees![0]);
        parser.recordLog = true;
        parser
            .registerVarType("Int", (cmds)=> {
                const str = cmds[0];
                if (/^[-+]?\d+$/.test(str))
                    return new IntType(parseInt(str));
                return null;
            })
            .registerVarType("Number", (cmds)=> {
                const str = cmds[0];
                if (/^[-+]?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(str))
                    return new NumberType(parseFloat(str));
                return null;
            })
            .registerFunction("f1", ()=> result = "f1")
            .registerFunction("f2", ()=> result = "f2");

        expect(parser.parse("/test 10")).toBe(true);
        expect(result).toBe("f1");
        expect(parser.parse("/test 10.3")).toBe(true);
        expect(result).toBe("f2");
    });

    it.skip("Mandatory ambiguity 2", ()=>{
        let result;
        const mcdl = `
        test
            <num>: Number
                f1()
            <int>: Int
                f2()
        `;
        const builder: CommandTreeBuilder = new McdlCommandTreeBuilder();
        const trees = builder.build(mcdl, CommandTreeMode.STRICT);
        expect(trees).not.toBeNull();
        const parser = new CommandParser(trees![0]);
        parser.recordLog = true;
        parser
            .registerVarType("Int", (cmds)=> {
                const str = cmds[0];
                if (/^[-+]?\d+$/.test(str))
                    return new IntType(parseInt(str));
                return null;
            })
            .registerVarType("Number", (cmds)=> {
                const str = cmds[0];
                if (/^[-+]?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(str))
                    return new NumberType(parseFloat(str));
                return null;
            })
            .registerFunction("f1", ()=> result = "f1")
            .registerFunction("f2", ()=> result = "f2");

        expect(parser.parse("/test 10")).toBe(true);
        expect(result).toBe("f1");
        expect(parser.parse("/test 10.3")).toBe(true);
        expect(result).toBe("f1");
    });

    it.skip("Optional ambiguity 1", ()=>{
        let result;
        const mcdl = `
        test
            (a)
                (b)
                    (c)
                        f1()
            [num]: Number
                (a)
                    f2()
            [int]: Int
                f3()
        `;
        const builder: CommandTreeBuilder = new McdlCommandTreeBuilder();
        let trees = builder.build(mcdl, CommandTreeMode.STRICT, (e)=>{
            error(e);
        });
        expect(trees).toBeNull();
        trees = builder.build(mcdl, CommandTreeMode.LOOSE, (e)=>{
            error(e);
        });
        expect(trees).not.toBeNull();
        const parser = new CommandParser(trees![0]);
        parser.recordLog = true;
        parser
            .registerVarType("Int", (cmds)=> {
                const str = cmds[0];
                if (/^[-+]?\d+$/.test(str))
                    return new IntType(parseInt(str));
                return null;
            })
            .registerVarType("Number", (cmds)=> {
                const str = cmds[0];
                if (/^[-+]?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(str))
                    return new NumberType(parseFloat(str));
                return null;
            })
            .registerFunction("f1", ()=> result = "f1")
            .registerFunction("f2", ()=> result = "f2")
            .registerFunction("f3", ()=> result = "f3");

        expect(parser.parse("/test")).toBe(true);
        expect(result).toBe("f3");
        expect(parser.parse("/test a")).toBe(true);
        expect(result).toBe("f1");
        expect(parser.parse("/test 10")).toBe(true);
        expect(result).toBe("f2");
    });

    it.skip("variable parameters 1", ()=>{
        const mcdl = `
        test
            <int>: Int
                [num]: Number
                    f1()
            a
                b
                    f2()
        `;
        const builder: CommandTreeBuilder = new McdlCommandTreeBuilder();
        const trees = builder.build(mcdl, CommandTreeMode.STRICT, (e)=>{
            error(e);
        });

        expect(trees).not.toBeNull();

        let n, i, us;
        const parser = new CommandParser(trees![0]);
        parser.recordLog = true;
        parser
            .registerVarType("Int", (cmds)=> {
                const str = cmds[0];
                if (/^[-+]?\d+$/.test(str))
                    return new IntType(parseInt(str));
                return null;
            })
            .registerVarType("Number", (cmds)=> {
                const str = cmds[0];
                if (/^[-+]?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(str))
                    return new NumberType(parseFloat(str));
                return null;
            })
            .registerFunction("f1", (p, int, num)=> {
                i = int.value;
                n = num.value;
            })
            .registerFunction("f2", (p, u)=> {
                log(u);
                us = u;
            });

        expect(parser.parse("/test 10 20.2")).toBe(true);
        expect(i).toBe(10);
        expect(n).toBe(20.2);
        expect(parser.parse("/test a")).toBe(false);
        expect(parser.parse("/test a b")).toBe(true);
        expect(us).toBe(undefined);
    });
});