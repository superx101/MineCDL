// Minecraft Command Definition Language
grammar Mcdl;

INTEGER: [0-9]+;
NAME: [A-Za-z_][A-Za-z0-9_]*;
TAGTEXT: '@' '(' .*? ')';
STRING : '"' .*? '"';

OPEN_ANGLE: '<';
CLOSE_ANGLE: '>';
OPEN_SQUARE: '[';
CLOSE_SQUARE: ']';
OPEN_PAREN : '(' ;
CLOSE_PAREN : ')' ;
INDENT: '\t' | '    '; // error when use ' '{4}

NEWLINE: '\r'?'\n';
COMMENT_SINGLE: '#' .*? '\r'? '\n' -> skip;
COMMENT_MULTI: '"""' .*? '"""' -> skip;
SW: ' '{0-3} -> skip;

indent: INDENT;
funcName: NAME;
enumName: NAME;
varName: NAME;
typeName: NAME;
tag: TAGTEXT;

program
    : NEWLINE* (statement (INDENT* tag)? NEWLINE*)+ ((NEWLINE|INDENT)* EOF)?
    ;

statement
    : enumeration # RootDeclare
    | indent+ enumeration # EnumDeclare
    | indent+ variable # VariableDeclare
    | indent+ funcName OPEN_PAREN CLOSE_PAREN # FunctionDeclare
    ;

enumeration
    : enumName  ('|' enumName)* # MandEnumDef
    | OPEN_PAREN enumName  ('|' enumName)* CLOSE_PAREN # OptEnumDef
    ;

variable
    : varTerm  ':'  type # ExplicitVariableDef
    | varTerm # ImplicitVariableDef
    ;

varTerm
    : OPEN_ANGLE  varName  CLOSE_ANGLE # MandVaribaleDef
    | OPEN_SQUARE  varName  CLOSE_SQUARE # OptVariableDef
    ;

type
    : typeName # ImplicitTypeDef
    | typeName  '<<'  parameterCount # ExplicitTypeDef
    ;

parameterCount
    : INTEGER # IntCount
    | '...' # MultiCount
    ;
