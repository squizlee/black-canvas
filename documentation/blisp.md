# BLISP Overview

# Variables

`(let x 10)` Bind 10 to x.
`(let y (func (q r) (+ q r)))` You can also bind a variable to a function.

In general:
`(let <variable name> (<body>))`

# Constants

# Keywords

true, false, let,

# Functions

```
(func (func-name <parameters>)
	(<operation 1>)
	...
	(<operation n>))
```

# Comments

Blisp does not support multiline comments. Any sequence of characters following a semicolon will be ignored by the interpreter.

`; this is a comment`

# Quoting

# Notes

-   `let` and `func` are equivalent they merely exist for semantics. For example, `let` is used to semantically define a variable while `func` is used to define a function. (But in the background a variable and a function are equivalent, they're just symbols that can be evaluated by the interpreter)
