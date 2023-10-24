const TestCommandAbstract = require("./command/js/TestCommandAbstract");

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