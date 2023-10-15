// Generated from ./src/mcdl/antlr/Mcdl.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class McdlLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly INTEGER = 5;
	public static readonly NAME = 6;
	public static readonly OPEN_ANGLE = 7;
	public static readonly CLOSE_ANGLE = 8;
	public static readonly OPEN_SQUARE = 9;
	public static readonly CLOSE_SQUARE = 10;
	public static readonly OPEN_PAREN = 11;
	public static readonly CLOSE_PAREN = 12;
	public static readonly INDENT = 13;
	public static readonly NEWLINE = 14;
	public static readonly COMMENT_SINGLE = 15;
	public static readonly COMMENT_MULTI = 16;
	public static readonly SW = 17;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "INTEGER", "NAME", "OPEN_ANGLE", "CLOSE_ANGLE", 
		"OPEN_SQUARE", "CLOSE_SQUARE", "OPEN_PAREN", "CLOSE_PAREN", "INDENT", 
		"NEWLINE", "COMMENT_SINGLE", "COMMENT_MULTI", "SW",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'|'", "':'", "'<<'", "'...'", undefined, undefined, "'<'", 
		"'>'", "'['", "']'", "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, "INTEGER", "NAME", 
		"OPEN_ANGLE", "CLOSE_ANGLE", "OPEN_SQUARE", "CLOSE_SQUARE", "OPEN_PAREN", 
		"CLOSE_PAREN", "INDENT", "NEWLINE", "COMMENT_SINGLE", "COMMENT_MULTI", 
		"SW",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(McdlLexer._LITERAL_NAMES, McdlLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return McdlLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(McdlLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "Mcdl.g4"; }

	// @Override
	public get ruleNames(): string[] { return McdlLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return McdlLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return McdlLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return McdlLexer.modeNames; }

	// @Override
	public action(_localctx: RuleContext, ruleIndex: number, actionIndex: number): void {
		switch (ruleIndex) {
		case 16:
			this.SW_action(_localctx, actionIndex);
			break;
		}
	}
	private SW_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 0:
			0-3
			break;
		}
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x13w\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
		"\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05" +
		"\x03\x05\x03\x05\x03\x06\x06\x062\n\x06\r\x06\x0E\x063\x03\x07\x03\x07" +
		"\x07\x078\n\x07\f\x07\x0E\x07;\v\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03" +
		"\n\x03\v\x03\v\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
		"\x03\x0E\x05\x0EN\n\x0E\x03\x0F\x05\x0FQ\n\x0F\x03\x0F\x03\x0F\x03\x10" +
		"\x03\x10\x07\x10W\n\x10\f\x10\x0E\x10Z\v\x10\x03\x10\x05\x10]\n\x10\x03" +
		"\x10\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x07" +
		"\x11h\n\x11\f\x11\x0E\x11k\v\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11" +
		"\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x04Xi\x02\x02\x13\x03" +
		"\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t" +
		"\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02" +
		"\x10\x1F\x02\x11!\x02\x12#\x02\x13\x03\x02\x05\x03\x022;\x05\x02C\\aa" +
		"c|\x06\x022;C\\aac|\x02}\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02" +
		"\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02" +
		"\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02" +
		"\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02" +
		"\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02" +
		"\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02#\x03\x02\x02\x02\x03%\x03" +
		"\x02\x02\x02\x05\'\x03\x02\x02\x02\x07)\x03\x02\x02\x02\t,\x03\x02\x02" +
		"\x02\v1\x03\x02\x02\x02\r5\x03\x02\x02\x02\x0F<\x03\x02\x02\x02\x11>\x03" +
		"\x02\x02\x02\x13@\x03\x02\x02\x02\x15B\x03\x02\x02\x02\x17D\x03\x02\x02" +
		"\x02\x19F\x03\x02\x02\x02\x1BM\x03\x02\x02\x02\x1DP\x03\x02\x02\x02\x1F" +
		"T\x03\x02\x02\x02!b\x03\x02\x02\x02#r\x03\x02\x02\x02%&\x07~\x02\x02&" +
		"\x04\x03\x02\x02\x02\'(\x07<\x02\x02(\x06\x03\x02\x02\x02)*\x07>\x02\x02" +
		"*+\x07>\x02\x02+\b\x03\x02\x02\x02,-\x070\x02\x02-.\x070\x02\x02./\x07" +
		"0\x02\x02/\n\x03\x02\x02\x0202\t\x02\x02\x0210\x03\x02\x02\x0223\x03\x02" +
		"\x02\x0231\x03\x02\x02\x0234\x03\x02\x02\x024\f\x03\x02\x02\x0259\t\x03" +
		"\x02\x0268\t\x04\x02\x0276\x03\x02\x02\x028;\x03\x02\x02\x0297\x03\x02" +
		"\x02\x029:\x03\x02\x02\x02:\x0E\x03\x02\x02\x02;9\x03\x02\x02\x02<=\x07" +
		">\x02\x02=\x10\x03\x02\x02\x02>?\x07@\x02\x02?\x12\x03\x02\x02\x02@A\x07" +
		"]\x02\x02A\x14\x03\x02\x02\x02BC\x07_\x02\x02C\x16\x03\x02\x02\x02DE\x07" +
		"*\x02\x02E\x18\x03\x02\x02\x02FG\x07+\x02\x02G\x1A\x03\x02\x02\x02HN\x07" +
		"\v\x02\x02IJ\x07\"\x02\x02JK\x07\"\x02\x02KL\x07\"\x02\x02LN\x07\"\x02" +
		"\x02MH\x03\x02\x02\x02MI\x03\x02\x02\x02N\x1C\x03\x02\x02\x02OQ\x07\x0F" +
		"\x02\x02PO\x03\x02\x02\x02PQ\x03\x02\x02\x02QR\x03\x02\x02\x02RS\x07\f" +
		"\x02\x02S\x1E\x03\x02\x02\x02TX\x07%\x02\x02UW\v\x02\x02\x02VU\x03\x02" +
		"\x02\x02WZ\x03\x02\x02\x02XY\x03\x02\x02\x02XV\x03\x02\x02\x02Y\\\x03" +
		"\x02\x02\x02ZX\x03\x02\x02\x02[]\x07\x0F\x02\x02\\[\x03\x02\x02\x02\\" +
		"]\x03\x02\x02\x02]^\x03\x02\x02\x02^_\x07\f\x02\x02_`\x03\x02\x02\x02" +
		"`a\b\x10\x02\x02a \x03\x02\x02\x02bc\x07$\x02\x02cd\x07$\x02\x02de\x07" +
		"$\x02\x02ei\x03\x02\x02\x02fh\v\x02\x02\x02gf\x03\x02\x02\x02hk\x03\x02" +
		"\x02\x02ij\x03\x02\x02\x02ig\x03\x02\x02\x02jl\x03\x02\x02\x02ki\x03\x02" +
		"\x02\x02lm\x07$\x02\x02mn\x07$\x02\x02no\x07$\x02\x02op\x03\x02\x02\x02" +
		"pq\b\x11\x02\x02q\"\x03\x02\x02\x02rs\x07\"\x02\x02st\b\x12\x03\x02tu" +
		"\x03\x02\x02\x02uv\b\x12\x02\x02v$\x03\x02\x02\x02\n\x0239MPX\\i\x04\b" +
		"\x02\x02\x03\x12\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!McdlLexer.__ATN) {
			McdlLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(McdlLexer._serializedATN));
		}

		return McdlLexer.__ATN;
	}

}

