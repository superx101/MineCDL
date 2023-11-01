/**
 * Generated by MineCDL(https://github.com/superx101/MineCDL) v
 * 
 * test2                     @(description="Test2 command")
 *     <number>: Int << 1
 *         f1()
 */

/**
 * An abstract class of register command in LLSE
 * @abstract
 */
class Test2CommandAbstract {
    
    constructor() {}
    
    register() {
        const command = mc.newCommand("test2", "Test2 command");
        undefined
        undefined
        command.mandatory("number", ParamType.Int, "", "mandatory_var_number");
        command.overload(["mandatory_var_number"]);
        command.setCallback((command, origin, output, result) => {
            this.callback(command, origin, output, result);
        });
        return command.setup();
    }
    
    callback(command, origin, output, result) {
        return this.f1(result.number);
    }
    
    f1(number) {}
}

module.exports = Test2CommandAbstract;
