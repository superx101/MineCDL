import { CodeGenerator, CommandTree } from "../command/CommandTree";

/**
 * This class has no implementation
 */
export class PythonGenerator extends CodeGenerator {
    public generate(trees: CommandTree[], distDir: string, ...args: any[]): void {
        throw new Error("Method not implemented.");
    }

}