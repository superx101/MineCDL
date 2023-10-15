// Generated from ./src/mcdl/antlr/Mcdl.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { MandVaribaleDefContext } from "./McdlParser";
import { OptVariableDefContext } from "./McdlParser";
import { IntCountContext } from "./McdlParser";
import { MultiCountContext } from "./McdlParser";
import { RootDeclareContext } from "./McdlParser";
import { EnumDeclareContext } from "./McdlParser";
import { VariableDeclareContext } from "./McdlParser";
import { FunctionDeclareContext } from "./McdlParser";
import { ExplicitVariableDefContext } from "./McdlParser";
import { ImplicitVariableDefContext } from "./McdlParser";
import { MandEnumDefContext } from "./McdlParser";
import { OptEnumDefContext } from "./McdlParser";
import { ImplicitTypeDefContext } from "./McdlParser";
import { ExplicitTypeDefContext } from "./McdlParser";
import { IndentContext } from "./McdlParser";
import { FuncNameContext } from "./McdlParser";
import { EnumNameContext } from "./McdlParser";
import { VarNameContext } from "./McdlParser";
import { TypeNameContext } from "./McdlParser";
import { ProgramContext } from "./McdlParser";
import { StatementContext } from "./McdlParser";
import { EnumerationContext } from "./McdlParser";
import { VariableContext } from "./McdlParser";
import { VarTermContext } from "./McdlParser";
import { TypeContext } from "./McdlParser";
import { ParameterCountContext } from "./McdlParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `McdlParser`.
 */
export interface McdlListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `MandVaribaleDef`
	 * labeled alternative in `McdlParser.varTerm`.
	 * @param ctx the parse tree
	 */
	enterMandVaribaleDef?: (ctx: MandVaribaleDefContext) => void;
	/**
	 * Exit a parse tree produced by the `MandVaribaleDef`
	 * labeled alternative in `McdlParser.varTerm`.
	 * @param ctx the parse tree
	 */
	exitMandVaribaleDef?: (ctx: MandVaribaleDefContext) => void;

	/**
	 * Enter a parse tree produced by the `OptVariableDef`
	 * labeled alternative in `McdlParser.varTerm`.
	 * @param ctx the parse tree
	 */
	enterOptVariableDef?: (ctx: OptVariableDefContext) => void;
	/**
	 * Exit a parse tree produced by the `OptVariableDef`
	 * labeled alternative in `McdlParser.varTerm`.
	 * @param ctx the parse tree
	 */
	exitOptVariableDef?: (ctx: OptVariableDefContext) => void;

	/**
	 * Enter a parse tree produced by the `IntCount`
	 * labeled alternative in `McdlParser.parameterCount`.
	 * @param ctx the parse tree
	 */
	enterIntCount?: (ctx: IntCountContext) => void;
	/**
	 * Exit a parse tree produced by the `IntCount`
	 * labeled alternative in `McdlParser.parameterCount`.
	 * @param ctx the parse tree
	 */
	exitIntCount?: (ctx: IntCountContext) => void;

	/**
	 * Enter a parse tree produced by the `MultiCount`
	 * labeled alternative in `McdlParser.parameterCount`.
	 * @param ctx the parse tree
	 */
	enterMultiCount?: (ctx: MultiCountContext) => void;
	/**
	 * Exit a parse tree produced by the `MultiCount`
	 * labeled alternative in `McdlParser.parameterCount`.
	 * @param ctx the parse tree
	 */
	exitMultiCount?: (ctx: MultiCountContext) => void;

	/**
	 * Enter a parse tree produced by the `RootDeclare`
	 * labeled alternative in `McdlParser.statement`.
	 * @param ctx the parse tree
	 */
	enterRootDeclare?: (ctx: RootDeclareContext) => void;
	/**
	 * Exit a parse tree produced by the `RootDeclare`
	 * labeled alternative in `McdlParser.statement`.
	 * @param ctx the parse tree
	 */
	exitRootDeclare?: (ctx: RootDeclareContext) => void;

	/**
	 * Enter a parse tree produced by the `EnumDeclare`
	 * labeled alternative in `McdlParser.statement`.
	 * @param ctx the parse tree
	 */
	enterEnumDeclare?: (ctx: EnumDeclareContext) => void;
	/**
	 * Exit a parse tree produced by the `EnumDeclare`
	 * labeled alternative in `McdlParser.statement`.
	 * @param ctx the parse tree
	 */
	exitEnumDeclare?: (ctx: EnumDeclareContext) => void;

	/**
	 * Enter a parse tree produced by the `VariableDeclare`
	 * labeled alternative in `McdlParser.statement`.
	 * @param ctx the parse tree
	 */
	enterVariableDeclare?: (ctx: VariableDeclareContext) => void;
	/**
	 * Exit a parse tree produced by the `VariableDeclare`
	 * labeled alternative in `McdlParser.statement`.
	 * @param ctx the parse tree
	 */
	exitVariableDeclare?: (ctx: VariableDeclareContext) => void;

	/**
	 * Enter a parse tree produced by the `FunctionDeclare`
	 * labeled alternative in `McdlParser.statement`.
	 * @param ctx the parse tree
	 */
	enterFunctionDeclare?: (ctx: FunctionDeclareContext) => void;
	/**
	 * Exit a parse tree produced by the `FunctionDeclare`
	 * labeled alternative in `McdlParser.statement`.
	 * @param ctx the parse tree
	 */
	exitFunctionDeclare?: (ctx: FunctionDeclareContext) => void;

	/**
	 * Enter a parse tree produced by the `ExplicitVariableDef`
	 * labeled alternative in `McdlParser.variable`.
	 * @param ctx the parse tree
	 */
	enterExplicitVariableDef?: (ctx: ExplicitVariableDefContext) => void;
	/**
	 * Exit a parse tree produced by the `ExplicitVariableDef`
	 * labeled alternative in `McdlParser.variable`.
	 * @param ctx the parse tree
	 */
	exitExplicitVariableDef?: (ctx: ExplicitVariableDefContext) => void;

	/**
	 * Enter a parse tree produced by the `ImplicitVariableDef`
	 * labeled alternative in `McdlParser.variable`.
	 * @param ctx the parse tree
	 */
	enterImplicitVariableDef?: (ctx: ImplicitVariableDefContext) => void;
	/**
	 * Exit a parse tree produced by the `ImplicitVariableDef`
	 * labeled alternative in `McdlParser.variable`.
	 * @param ctx the parse tree
	 */
	exitImplicitVariableDef?: (ctx: ImplicitVariableDefContext) => void;

	/**
	 * Enter a parse tree produced by the `MandEnumDef`
	 * labeled alternative in `McdlParser.enumeration`.
	 * @param ctx the parse tree
	 */
	enterMandEnumDef?: (ctx: MandEnumDefContext) => void;
	/**
	 * Exit a parse tree produced by the `MandEnumDef`
	 * labeled alternative in `McdlParser.enumeration`.
	 * @param ctx the parse tree
	 */
	exitMandEnumDef?: (ctx: MandEnumDefContext) => void;

	/**
	 * Enter a parse tree produced by the `OptEnumDef`
	 * labeled alternative in `McdlParser.enumeration`.
	 * @param ctx the parse tree
	 */
	enterOptEnumDef?: (ctx: OptEnumDefContext) => void;
	/**
	 * Exit a parse tree produced by the `OptEnumDef`
	 * labeled alternative in `McdlParser.enumeration`.
	 * @param ctx the parse tree
	 */
	exitOptEnumDef?: (ctx: OptEnumDefContext) => void;

	/**
	 * Enter a parse tree produced by the `ImplicitTypeDef`
	 * labeled alternative in `McdlParser.type`.
	 * @param ctx the parse tree
	 */
	enterImplicitTypeDef?: (ctx: ImplicitTypeDefContext) => void;
	/**
	 * Exit a parse tree produced by the `ImplicitTypeDef`
	 * labeled alternative in `McdlParser.type`.
	 * @param ctx the parse tree
	 */
	exitImplicitTypeDef?: (ctx: ImplicitTypeDefContext) => void;

	/**
	 * Enter a parse tree produced by the `ExplicitTypeDef`
	 * labeled alternative in `McdlParser.type`.
	 * @param ctx the parse tree
	 */
	enterExplicitTypeDef?: (ctx: ExplicitTypeDefContext) => void;
	/**
	 * Exit a parse tree produced by the `ExplicitTypeDef`
	 * labeled alternative in `McdlParser.type`.
	 * @param ctx the parse tree
	 */
	exitExplicitTypeDef?: (ctx: ExplicitTypeDefContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.indent`.
	 * @param ctx the parse tree
	 */
	enterIndent?: (ctx: IndentContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.indent`.
	 * @param ctx the parse tree
	 */
	exitIndent?: (ctx: IndentContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.funcName`.
	 * @param ctx the parse tree
	 */
	enterFuncName?: (ctx: FuncNameContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.funcName`.
	 * @param ctx the parse tree
	 */
	exitFuncName?: (ctx: FuncNameContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.enumName`.
	 * @param ctx the parse tree
	 */
	enterEnumName?: (ctx: EnumNameContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.enumName`.
	 * @param ctx the parse tree
	 */
	exitEnumName?: (ctx: EnumNameContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.varName`.
	 * @param ctx the parse tree
	 */
	enterVarName?: (ctx: VarNameContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.varName`.
	 * @param ctx the parse tree
	 */
	exitVarName?: (ctx: VarNameContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.typeName`.
	 * @param ctx the parse tree
	 */
	enterTypeName?: (ctx: TypeNameContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.typeName`.
	 * @param ctx the parse tree
	 */
	exitTypeName?: (ctx: TypeNameContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.enumeration`.
	 * @param ctx the parse tree
	 */
	enterEnumeration?: (ctx: EnumerationContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.enumeration`.
	 * @param ctx the parse tree
	 */
	exitEnumeration?: (ctx: EnumerationContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.variable`.
	 * @param ctx the parse tree
	 */
	enterVariable?: (ctx: VariableContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.variable`.
	 * @param ctx the parse tree
	 */
	exitVariable?: (ctx: VariableContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.varTerm`.
	 * @param ctx the parse tree
	 */
	enterVarTerm?: (ctx: VarTermContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.varTerm`.
	 * @param ctx the parse tree
	 */
	exitVarTerm?: (ctx: VarTermContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.type`.
	 * @param ctx the parse tree
	 */
	enterType?: (ctx: TypeContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.type`.
	 * @param ctx the parse tree
	 */
	exitType?: (ctx: TypeContext) => void;

	/**
	 * Enter a parse tree produced by `McdlParser.parameterCount`.
	 * @param ctx the parse tree
	 */
	enterParameterCount?: (ctx: ParameterCountContext) => void;
	/**
	 * Exit a parse tree produced by `McdlParser.parameterCount`.
	 * @param ctx the parse tree
	 */
	exitParameterCount?: (ctx: ParameterCountContext) => void;
}

