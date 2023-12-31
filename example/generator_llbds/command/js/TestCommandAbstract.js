/**
 * Generated by MineCDL(https://github.com/superx101/MineCDL) v
 * 
 * test                                @(description="A example command")
 *     player
 *         <players>: Player << 1
 *             [pos]: BlockPos << 1
 *                 f1()
 *         [pos]: BlockPos << 1
 *             f2()
 *     other | o                       @(name="other", enumOptions=1)
 *         <number>: Int << 1
 *             (replace)
 *                 f3()
 *             hollow
 *                 f4()
 *         [block]: Block << 1
 *             [item]: Item << 1
 *                 f5()
 */

/**
 * An abstract class of register command in LLSE
 * @abstract
 */
class TestCommandAbstract {
    
    constructor() {}
    
    register() {
        const command = mc.newCommand("test", "A example command");
        command.setEnum("player", ["player"]);
        command.setEnum("other", ["other", "o"]);
        command.setEnum("replace", ["replace"]);
        command.setEnum("hollow", ["hollow"]);
        command.optional("replace", ParamType.Enum, "replace", "optional_replace");
        command.optional("pos", ParamType.BlockPos, "", "optional_var_pos");
        command.optional("block", ParamType.Block, "", "optional_var_block");
        command.optional("item", ParamType.Item, "", "optional_var_item");
        command.mandatory("player", ParamType.Enum, "player", "mandatory_player");
        command.mandatory("other", ParamType.Enum, "other", "mandatory_other_o", 1);
        command.mandatory("hollow", ParamType.Enum, "hollow", "mandatory_hollow");
        command.mandatory("players", ParamType.Player, "", "mandatory_var_players");
        command.mandatory("number", ParamType.Int, "", "mandatory_var_number");
        command.overload(["mandatory_player", "mandatory_var_players", "optional_var_pos"]);
        command.overload(["mandatory_player", "optional_var_pos"]);
        command.overload(["mandatory_other", "mandatory_var_number", "optional_replace"]);
        command.overload(["mandatory_other", "mandatory_var_number", "mandatory_hollow"]);
        command.overload(["mandatory_other", "optional_var_block", "optional_var_item"]);
        command.setCallback((command, origin, output, result) => {
            this.callback(command, origin, output, result);
        });
        return command.setup();
    }
    
    callback(command, origin, output, result) {
        if (result.player !== undefined) {
            if (result.players !== undefined) {
                return this.f1(result.player, result.players, result.pos);
            }
            return this.f2(result.player, result.pos);
        }
        else if (result.other !== undefined) {
            if (result.number !== undefined) {
                if (result.hollow !== undefined) {
                    return this.f4(result.other, result.number, result.hollow);
                }
                return this.f3(result.other, result.number, result.replace);
            }
            return this.f5(result.other, result.block, result.item);
        }
    }
    
    f1(player, players, pos) {}
    
    f2(player, pos) {}
    
    f4(other, number, hollow) {}
    
    f3(other, number, replace) {}
    
    f5(other, block, item) {}
}

module.exports = TestCommandAbstract;
