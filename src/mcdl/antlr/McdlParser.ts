// Generated from ./src/mcdl/antlr/Mcdl.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { McdlListener } from "./McdlListener";

export class McdlParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly INTEGER = 5;
	public static readonly NAME = 6;
	public static readonly TAGTEXT = 7;
	public static readonly STRING = 8;
	public static readonly OPEN_ANGLE = 9;
	public static readonly CLOSE_ANGLE = 10;
	public static readonly OPEN_SQUARE = 11;
	public static readonly CLOSE_SQUARE = 12;
	public static readonly OPEN_PAREN = 13;
	public static readonly CLOSE_PAREN = 14;
	public static readonly INDENT = 15;
	public static readonly NEWLINE = 16;
	public static readonly COMMENT_SINGLE = 17;
	public static readonly COMMENT_MULTI = 18;
	public static readonly SW = 19;
	public static readonly RULE_indent = 0;
	public static readonly RULE_funcName = 1;
	public static readonly RULE_enumName = 2;
	public static readonly RULE_varName = 3;
	public static readonly RULE_typeName = 4;
	public static readonly RULE_tag = 5;
	public static readonly RULE_program = 6;
	public static readonly RULE_statement = 7;
	public static readonly RULE_enumeration = 8;
	public static readonly RULE_variable = 9;
	public static readonly RULE_varTerm = 10;
	public static readonly RULE_type = 11;
	public static readonly RULE_parameterCount = 12;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"indent", "funcName", "enumName", "varName", "typeName", "tag", "program", 
		"statement", "enumeration", "variable", "varTerm", "type", "parameterCount",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'|'", "':'", "'<<'", "'...'", undefined, undefined, undefined, 
		undefined, "'<'", "'>'", "'['", "']'", "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, "INTEGER", "NAME", 
		"TAGTEXT", "STRING", "OPEN_ANGLE", "CLOSE_ANGLE", "OPEN_SQUARE", "CLOSE_SQUARE", 
		"OPEN_PAREN", "CLOSE_PAREN", "INDENT", "NEWLINE", "COMMENT_SINGLE", "COMMENT_MULTI", 
		"SW",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(McdlParser._LITERAL_NAMES, McdlParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return McdlParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Mcdl.g4"; }

	// @Override
	public get ruleNames(): string[] { return McdlParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return McdlParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(McdlParser._ATN, this);
	}
	// @RuleVersion(0)
	public indent(): IndentContext {
		let _localctx: IndentContext = new IndentContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, McdlParser.RULE_indent);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 26;
			this.match(McdlParser.INDENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public funcName(): FuncNameContext {
		let _localctx: FuncNameContext = new FuncNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, McdlParser.RULE_funcName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 28;
			this.match(McdlParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumName(): EnumNameContext {
		let _localctx: EnumNameContext = new EnumNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, McdlParser.RULE_enumName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 30;
			this.match(McdlParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varName(): VarNameContext {
		let _localctx: VarNameContext = new VarNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, McdlParser.RULE_varName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 32;
			this.match(McdlParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeName(): TypeNameContext {
		let _localctx: TypeNameContext = new TypeNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, McdlParser.RULE_typeName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 34;
			this.match(McdlParser.NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tag(): TagContext {
		let _localctx: TagContext = new TagContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, McdlParser.RULE_tag);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 36;
			this.match(McdlParser.TAGTEXT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, McdlParser.RULE_program);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 41;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === McdlParser.NEWLINE) {
				{
				{
				this.state = 38;
				this.match(McdlParser.NEWLINE);
				}
				}
				this.state = 43;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 60;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 44;
					this.statement();
					this.state = 52;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
					case 1:
						{
						this.state = 48;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la === McdlParser.INDENT) {
							{
							{
							this.state = 45;
							this.match(McdlParser.INDENT);
							}
							}
							this.state = 50;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						this.state = 51;
						this.tag();
						}
						break;
					}
					this.state = 57;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 54;
							this.match(McdlParser.NEWLINE);
							}
							}
						}
						this.state = 59;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
					}
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 62;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 71;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 67;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === McdlParser.INDENT || _la === McdlParser.NEWLINE) {
					{
					{
					this.state = 64;
					_la = this._input.LA(1);
					if (!(_la === McdlParser.INDENT || _la === McdlParser.NEWLINE)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
					}
					this.state = 69;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 70;
				this.match(McdlParser.EOF);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, McdlParser.RULE_statement);
		let _la: number;
		try {
			this.state = 97;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				_localctx = new RootDeclareContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 73;
				this.enumeration();
				}
				break;

			case 2:
				_localctx = new EnumDeclareContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 75;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 74;
					this.indent();
					}
					}
					this.state = 77;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === McdlParser.INDENT);
				this.state = 79;
				this.enumeration();
				}
				break;

			case 3:
				_localctx = new VariableDeclareContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 82;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 81;
					this.indent();
					}
					}
					this.state = 84;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === McdlParser.INDENT);
				this.state = 86;
				this.variable();
				}
				break;

			case 4:
				_localctx = new FunctionDeclareContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 89;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 88;
					this.indent();
					}
					}
					this.state = 91;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === McdlParser.INDENT);
				this.state = 93;
				this.funcName();
				this.state = 94;
				this.match(McdlParser.OPEN_PAREN);
				this.state = 95;
				this.match(McdlParser.CLOSE_PAREN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumeration(): EnumerationContext {
		let _localctx: EnumerationContext = new EnumerationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, McdlParser.RULE_enumeration);
		let _la: number;
		try {
			this.state = 118;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case McdlParser.NAME:
				_localctx = new MandEnumDefContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 99;
				this.enumName();
				this.state = 104;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === McdlParser.T__0) {
					{
					{
					this.state = 100;
					this.match(McdlParser.T__0);
					this.state = 101;
					this.enumName();
					}
					}
					this.state = 106;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case McdlParser.OPEN_PAREN:
				_localctx = new OptEnumDefContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 107;
				this.match(McdlParser.OPEN_PAREN);
				this.state = 108;
				this.enumName();
				this.state = 113;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === McdlParser.T__0) {
					{
					{
					this.state = 109;
					this.match(McdlParser.T__0);
					this.state = 110;
					this.enumName();
					}
					}
					this.state = 115;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 116;
				this.match(McdlParser.CLOSE_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable(): VariableContext {
		let _localctx: VariableContext = new VariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, McdlParser.RULE_variable);
		try {
			this.state = 125;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				_localctx = new ExplicitVariableDefContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 120;
				this.varTerm();
				this.state = 121;
				this.match(McdlParser.T__1);
				this.state = 122;
				this.type();
				}
				break;

			case 2:
				_localctx = new ImplicitVariableDefContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 124;
				this.varTerm();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varTerm(): VarTermContext {
		let _localctx: VarTermContext = new VarTermContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, McdlParser.RULE_varTerm);
		try {
			this.state = 135;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case McdlParser.OPEN_ANGLE:
				_localctx = new MandVaribaleDefContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 127;
				this.match(McdlParser.OPEN_ANGLE);
				this.state = 128;
				this.varName();
				this.state = 129;
				this.match(McdlParser.CLOSE_ANGLE);
				}
				break;
			case McdlParser.OPEN_SQUARE:
				_localctx = new OptVariableDefContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 131;
				this.match(McdlParser.OPEN_SQUARE);
				this.state = 132;
				this.varName();
				this.state = 133;
				this.match(McdlParser.CLOSE_SQUARE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type(): TypeContext {
		let _localctx: TypeContext = new TypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, McdlParser.RULE_type);
		try {
			this.state = 142;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				_localctx = new ImplicitTypeDefContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 137;
				this.typeName();
				}
				break;

			case 2:
				_localctx = new ExplicitTypeDefContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 138;
				this.typeName();
				this.state = 139;
				this.match(McdlParser.T__2);
				this.state = 140;
				this.parameterCount();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameterCount(): ParameterCountContext {
		let _localctx: ParameterCountContext = new ParameterCountContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, McdlParser.RULE_parameterCount);
		try {
			this.state = 146;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case McdlParser.INTEGER:
				_localctx = new IntCountContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 144;
				this.match(McdlParser.INTEGER);
				}
				break;
			case McdlParser.T__3:
				_localctx = new MultiCountContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 145;
				this.match(McdlParser.T__3);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x15\x97\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x05\x03" +
		"\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x07\b*\n\b\f\b\x0E\b-\v\b\x03" +
		"\b\x03\b\x07\b1\n\b\f\b\x0E\b4\v\b\x03\b\x05\b7\n\b\x03\b\x07\b:\n\b\f" +
		"\b\x0E\b=\v\b\x06\b?\n\b\r\b\x0E\b@\x03\b\x07\bD\n\b\f\b\x0E\bG\v\b\x03" +
		"\b\x05\bJ\n\b\x03\t\x03\t\x06\tN\n\t\r\t\x0E\tO\x03\t\x03\t\x03\t\x06" +
		"\tU\n\t\r\t\x0E\tV\x03\t\x03\t\x03\t\x06\t\\\n\t\r\t\x0E\t]\x03\t\x03" +
		"\t\x03\t\x03\t\x05\td\n\t\x03\n\x03\n\x03\n\x07\ni\n\n\f\n\x0E\nl\v\n" +
		"\x03\n\x03\n\x03\n\x03\n\x07\nr\n\n\f\n\x0E\nu\v\n\x03\n\x03\n\x05\ny" +
		"\n\n\x03\v\x03\v\x03\v\x03\v\x03\v\x05\v\x80\n\v\x03\f\x03\f\x03\f\x03" +
		"\f\x03\f\x03\f\x03\f\x03\f\x05\f\x8A\n\f\x03\r\x03\r\x03\r\x03\r\x03\r" +
		"\x05\r\x91\n\r\x03\x0E\x03\x0E\x05\x0E\x95\n\x0E\x03\x0E\x02\x02\x02\x0F" +
		"\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14" +
		"\x02\x16\x02\x18\x02\x1A\x02\x02\x03\x03\x02\x11\x12\x02\x9D\x02\x1C\x03" +
		"\x02\x02\x02\x04\x1E\x03\x02\x02\x02\x06 \x03\x02\x02\x02\b\"\x03\x02" +
		"\x02\x02\n$\x03\x02\x02\x02\f&\x03\x02\x02\x02\x0E+\x03\x02\x02\x02\x10" +
		"c\x03\x02\x02\x02\x12x\x03\x02\x02\x02\x14\x7F\x03\x02\x02\x02\x16\x89" +
		"\x03\x02\x02\x02\x18\x90\x03\x02\x02\x02\x1A\x94\x03\x02\x02\x02\x1C\x1D" +
		"\x07\x11\x02\x02\x1D\x03\x03\x02\x02\x02\x1E\x1F\x07\b\x02\x02\x1F\x05" +
		"\x03\x02\x02\x02 !\x07\b\x02\x02!\x07\x03\x02\x02\x02\"#\x07\b\x02\x02" +
		"#\t\x03\x02\x02\x02$%\x07\b\x02\x02%\v\x03\x02\x02\x02&\'\x07\t\x02\x02" +
		"\'\r\x03\x02\x02\x02(*\x07\x12\x02\x02)(\x03\x02\x02\x02*-\x03\x02\x02" +
		"\x02+)\x03\x02\x02\x02+,\x03\x02\x02\x02,>\x03\x02\x02\x02-+\x03\x02\x02" +
		"\x02.6\x05\x10\t\x02/1\x07\x11\x02\x020/\x03\x02\x02\x0214\x03\x02\x02" +
		"\x0220\x03\x02\x02\x0223\x03\x02\x02\x0235\x03\x02\x02\x0242\x03\x02\x02" +
		"\x0257\x05\f\x07\x0262\x03\x02\x02\x0267\x03\x02\x02\x027;\x03\x02\x02" +
		"\x028:\x07\x12\x02\x0298\x03\x02\x02\x02:=\x03\x02\x02\x02;9\x03\x02\x02" +
		"\x02;<\x03\x02\x02\x02<?\x03\x02\x02\x02=;\x03\x02\x02\x02>.\x03\x02\x02" +
		"\x02?@\x03\x02\x02\x02@>\x03\x02\x02\x02@A\x03\x02\x02\x02AI\x03\x02\x02" +
		"\x02BD\t\x02\x02\x02CB\x03\x02\x02\x02DG\x03\x02\x02\x02EC\x03\x02\x02" +
		"\x02EF\x03\x02\x02\x02FH\x03\x02\x02\x02GE\x03\x02\x02\x02HJ\x07\x02\x02" +
		"\x03IE\x03\x02\x02\x02IJ\x03\x02\x02\x02J\x0F\x03\x02\x02\x02Kd\x05\x12" +
		"\n\x02LN\x05\x02\x02\x02ML\x03\x02\x02\x02NO\x03\x02\x02\x02OM\x03\x02" +
		"\x02\x02OP\x03\x02\x02\x02PQ\x03\x02\x02\x02QR\x05\x12\n\x02Rd\x03\x02" +
		"\x02\x02SU\x05\x02\x02\x02TS\x03\x02\x02\x02UV\x03\x02\x02\x02VT\x03\x02" +
		"\x02\x02VW\x03\x02\x02\x02WX\x03\x02\x02\x02XY\x05\x14\v\x02Yd\x03\x02" +
		"\x02\x02Z\\\x05\x02\x02\x02[Z\x03\x02\x02\x02\\]\x03\x02\x02\x02][\x03" +
		"\x02\x02\x02]^\x03\x02\x02\x02^_\x03\x02\x02\x02_`\x05\x04\x03\x02`a\x07" +
		"\x0F\x02\x02ab\x07\x10\x02\x02bd\x03\x02\x02\x02cK\x03\x02\x02\x02cM\x03" +
		"\x02\x02\x02cT\x03\x02\x02\x02c[\x03\x02\x02\x02d\x11\x03\x02\x02\x02" +
		"ej\x05\x06\x04\x02fg\x07\x03\x02\x02gi\x05\x06\x04\x02hf\x03\x02\x02\x02" +
		"il\x03\x02\x02\x02jh\x03\x02\x02\x02jk\x03\x02\x02\x02ky\x03\x02\x02\x02" +
		"lj\x03\x02\x02\x02mn\x07\x0F\x02\x02ns\x05\x06\x04\x02op\x07\x03\x02\x02" +
		"pr\x05\x06\x04\x02qo\x03\x02\x02\x02ru\x03\x02\x02\x02sq\x03\x02\x02\x02" +
		"st\x03\x02\x02\x02tv\x03\x02\x02\x02us\x03\x02\x02\x02vw\x07\x10\x02\x02" +
		"wy\x03\x02\x02\x02xe\x03\x02\x02\x02xm\x03\x02\x02\x02y\x13\x03\x02\x02" +
		"\x02z{\x05\x16\f\x02{|\x07\x04\x02\x02|}\x05\x18\r\x02}\x80\x03\x02\x02" +
		"\x02~\x80\x05\x16\f\x02\x7Fz\x03\x02\x02\x02\x7F~\x03\x02\x02\x02\x80" +
		"\x15\x03\x02\x02\x02\x81\x82\x07\v\x02\x02\x82\x83\x05\b\x05\x02\x83\x84" +
		"\x07\f\x02\x02\x84\x8A\x03\x02\x02\x02\x85\x86\x07\r\x02\x02\x86\x87\x05" +
		"\b\x05\x02\x87\x88\x07\x0E\x02\x02\x88\x8A\x03\x02\x02\x02\x89\x81\x03" +
		"\x02\x02\x02\x89\x85\x03\x02\x02\x02\x8A\x17\x03\x02\x02\x02\x8B\x91\x05" +
		"\n\x06\x02\x8C\x8D\x05\n\x06\x02\x8D\x8E\x07\x05\x02\x02\x8E\x8F\x05\x1A" +
		"\x0E\x02\x8F\x91\x03\x02\x02\x02\x90\x8B\x03\x02\x02\x02\x90\x8C\x03\x02" +
		"\x02\x02\x91\x19\x03\x02\x02\x02\x92\x95\x07\x07\x02\x02\x93\x95\x07\x06" +
		"\x02\x02\x94\x92\x03\x02\x02\x02\x94\x93\x03\x02\x02\x02\x95\x1B\x03\x02" +
		"\x02\x02\x14+26;@EIOV]cjsx\x7F\x89\x90\x94";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!McdlParser.__ATN) {
			McdlParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(McdlParser._serializedATN));
		}

		return McdlParser.__ATN;
	}

}

export class IndentContext extends ParserRuleContext {
	public INDENT(): TerminalNode { return this.getToken(McdlParser.INDENT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_indent; }
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterIndent) {
			listener.enterIndent(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitIndent) {
			listener.exitIndent(this);
		}
	}
}


export class FuncNameContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(McdlParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_funcName; }
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterFuncName) {
			listener.enterFuncName(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitFuncName) {
			listener.exitFuncName(this);
		}
	}
}


export class EnumNameContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(McdlParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_enumName; }
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterEnumName) {
			listener.enterEnumName(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitEnumName) {
			listener.exitEnumName(this);
		}
	}
}


export class VarNameContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(McdlParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_varName; }
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterVarName) {
			listener.enterVarName(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitVarName) {
			listener.exitVarName(this);
		}
	}
}


export class TypeNameContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(McdlParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_typeName; }
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterTypeName) {
			listener.enterTypeName(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitTypeName) {
			listener.exitTypeName(this);
		}
	}
}


export class TagContext extends ParserRuleContext {
	public TAGTEXT(): TerminalNode { return this.getToken(McdlParser.TAGTEXT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_tag; }
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterTag) {
			listener.enterTag(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitTag) {
			listener.exitTag(this);
		}
	}
}


export class ProgramContext extends ParserRuleContext {
	public NEWLINE(): TerminalNode[];
	public NEWLINE(i: number): TerminalNode;
	public NEWLINE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(McdlParser.NEWLINE);
		} else {
			return this.getToken(McdlParser.NEWLINE, i);
		}
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	public EOF(): TerminalNode | undefined { return this.tryGetToken(McdlParser.EOF, 0); }
	public tag(): TagContext[];
	public tag(i: number): TagContext;
	public tag(i?: number): TagContext | TagContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TagContext);
		} else {
			return this.getRuleContext(i, TagContext);
		}
	}
	public INDENT(): TerminalNode[];
	public INDENT(i: number): TerminalNode;
	public INDENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(McdlParser.INDENT);
		} else {
			return this.getToken(McdlParser.INDENT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_program; }
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_statement; }
	public copyFrom(ctx: StatementContext): void {
		super.copyFrom(ctx);
	}
}
export class RootDeclareContext extends StatementContext {
	public enumeration(): EnumerationContext {
		return this.getRuleContext(0, EnumerationContext);
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterRootDeclare) {
			listener.enterRootDeclare(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitRootDeclare) {
			listener.exitRootDeclare(this);
		}
	}
}
export class EnumDeclareContext extends StatementContext {
	public enumeration(): EnumerationContext {
		return this.getRuleContext(0, EnumerationContext);
	}
	public indent(): IndentContext[];
	public indent(i: number): IndentContext;
	public indent(i?: number): IndentContext | IndentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IndentContext);
		} else {
			return this.getRuleContext(i, IndentContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterEnumDeclare) {
			listener.enterEnumDeclare(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitEnumDeclare) {
			listener.exitEnumDeclare(this);
		}
	}
}
export class VariableDeclareContext extends StatementContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	public indent(): IndentContext[];
	public indent(i: number): IndentContext;
	public indent(i?: number): IndentContext | IndentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IndentContext);
		} else {
			return this.getRuleContext(i, IndentContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterVariableDeclare) {
			listener.enterVariableDeclare(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitVariableDeclare) {
			listener.exitVariableDeclare(this);
		}
	}
}
export class FunctionDeclareContext extends StatementContext {
	public funcName(): FuncNameContext {
		return this.getRuleContext(0, FuncNameContext);
	}
	public OPEN_PAREN(): TerminalNode { return this.getToken(McdlParser.OPEN_PAREN, 0); }
	public CLOSE_PAREN(): TerminalNode { return this.getToken(McdlParser.CLOSE_PAREN, 0); }
	public indent(): IndentContext[];
	public indent(i: number): IndentContext;
	public indent(i?: number): IndentContext | IndentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IndentContext);
		} else {
			return this.getRuleContext(i, IndentContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterFunctionDeclare) {
			listener.enterFunctionDeclare(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitFunctionDeclare) {
			listener.exitFunctionDeclare(this);
		}
	}
}


export class EnumerationContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_enumeration; }
	public copyFrom(ctx: EnumerationContext): void {
		super.copyFrom(ctx);
	}
}
export class MandEnumDefContext extends EnumerationContext {
	public enumName(): EnumNameContext[];
	public enumName(i: number): EnumNameContext;
	public enumName(i?: number): EnumNameContext | EnumNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EnumNameContext);
		} else {
			return this.getRuleContext(i, EnumNameContext);
		}
	}
	constructor(ctx: EnumerationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterMandEnumDef) {
			listener.enterMandEnumDef(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitMandEnumDef) {
			listener.exitMandEnumDef(this);
		}
	}
}
export class OptEnumDefContext extends EnumerationContext {
	public OPEN_PAREN(): TerminalNode { return this.getToken(McdlParser.OPEN_PAREN, 0); }
	public enumName(): EnumNameContext[];
	public enumName(i: number): EnumNameContext;
	public enumName(i?: number): EnumNameContext | EnumNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EnumNameContext);
		} else {
			return this.getRuleContext(i, EnumNameContext);
		}
	}
	public CLOSE_PAREN(): TerminalNode { return this.getToken(McdlParser.CLOSE_PAREN, 0); }
	constructor(ctx: EnumerationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterOptEnumDef) {
			listener.enterOptEnumDef(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitOptEnumDef) {
			listener.exitOptEnumDef(this);
		}
	}
}


export class VariableContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_variable; }
	public copyFrom(ctx: VariableContext): void {
		super.copyFrom(ctx);
	}
}
export class ExplicitVariableDefContext extends VariableContext {
	public varTerm(): VarTermContext {
		return this.getRuleContext(0, VarTermContext);
	}
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	constructor(ctx: VariableContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterExplicitVariableDef) {
			listener.enterExplicitVariableDef(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitExplicitVariableDef) {
			listener.exitExplicitVariableDef(this);
		}
	}
}
export class ImplicitVariableDefContext extends VariableContext {
	public varTerm(): VarTermContext {
		return this.getRuleContext(0, VarTermContext);
	}
	constructor(ctx: VariableContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterImplicitVariableDef) {
			listener.enterImplicitVariableDef(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitImplicitVariableDef) {
			listener.exitImplicitVariableDef(this);
		}
	}
}


export class VarTermContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_varTerm; }
	public copyFrom(ctx: VarTermContext): void {
		super.copyFrom(ctx);
	}
}
export class MandVaribaleDefContext extends VarTermContext {
	public OPEN_ANGLE(): TerminalNode { return this.getToken(McdlParser.OPEN_ANGLE, 0); }
	public varName(): VarNameContext {
		return this.getRuleContext(0, VarNameContext);
	}
	public CLOSE_ANGLE(): TerminalNode { return this.getToken(McdlParser.CLOSE_ANGLE, 0); }
	constructor(ctx: VarTermContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterMandVaribaleDef) {
			listener.enterMandVaribaleDef(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitMandVaribaleDef) {
			listener.exitMandVaribaleDef(this);
		}
	}
}
export class OptVariableDefContext extends VarTermContext {
	public OPEN_SQUARE(): TerminalNode { return this.getToken(McdlParser.OPEN_SQUARE, 0); }
	public varName(): VarNameContext {
		return this.getRuleContext(0, VarNameContext);
	}
	public CLOSE_SQUARE(): TerminalNode { return this.getToken(McdlParser.CLOSE_SQUARE, 0); }
	constructor(ctx: VarTermContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterOptVariableDef) {
			listener.enterOptVariableDef(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitOptVariableDef) {
			listener.exitOptVariableDef(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_type; }
	public copyFrom(ctx: TypeContext): void {
		super.copyFrom(ctx);
	}
}
export class ImplicitTypeDefContext extends TypeContext {
	public typeName(): TypeNameContext {
		return this.getRuleContext(0, TypeNameContext);
	}
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterImplicitTypeDef) {
			listener.enterImplicitTypeDef(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitImplicitTypeDef) {
			listener.exitImplicitTypeDef(this);
		}
	}
}
export class ExplicitTypeDefContext extends TypeContext {
	public typeName(): TypeNameContext {
		return this.getRuleContext(0, TypeNameContext);
	}
	public parameterCount(): ParameterCountContext {
		return this.getRuleContext(0, ParameterCountContext);
	}
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterExplicitTypeDef) {
			listener.enterExplicitTypeDef(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitExplicitTypeDef) {
			listener.exitExplicitTypeDef(this);
		}
	}
}


export class ParameterCountContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return McdlParser.RULE_parameterCount; }
	public copyFrom(ctx: ParameterCountContext): void {
		super.copyFrom(ctx);
	}
}
export class IntCountContext extends ParameterCountContext {
	public INTEGER(): TerminalNode { return this.getToken(McdlParser.INTEGER, 0); }
	constructor(ctx: ParameterCountContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterIntCount) {
			listener.enterIntCount(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitIntCount) {
			listener.exitIntCount(this);
		}
	}
}
export class MultiCountContext extends ParameterCountContext {
	constructor(ctx: ParameterCountContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: McdlListener): void {
		if (listener.enterMultiCount) {
			listener.enterMultiCount(this);
		}
	}
	// @Override
	public exitRule(listener: McdlListener): void {
		if (listener.exitMultiCount) {
			listener.exitMultiCount(this);
		}
	}
}


