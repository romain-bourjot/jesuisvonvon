# JeSuisVonvon

> This is an interpreter for a variation of the [Brainf*ck language](https://en.wikipedia.org/wiki/Brainfuck) called JeSuisVonvon.

## Installation

```sh
git clone https://github.com/romain-bourjot/jesuisvonvon.git
```

## Usage

```sh
node jesuisvonvon file.vonvon
```

## Language

| Keyword     | Meaning                                         | Brainf*ck |
|-------------|-------------------------------------------------|-----------|
| bonjour     |  Output the pointed byte                        | .         |
| ,           |  Input a byte                                   | ,         |
| je          |  Point to the next cell                         | >         |
| suis        |  Decrement the pointed byte                     | -         |
| vonvon      |  Increment the pointed byte                     | +         |
| !           |  Point to the previous cell                     | <         |
| [           |  Jump to matching ] if pointed byte is zero     | [         |
| ]           |  Jump to matching [ if pointed byte is not zero | ]         |

The language is case-insensitive and everything that is not a keyword is ignored, the two following examples are the same.

```
vonvon[je,bonjour]
```

```
lOlLOLO45vonVOnvon41[NOP
jE


,bonBONjOURmoije]

This program prints what you type.
```

Also, there can be any number of 'o' in the 'vonvon' keyword, thus the next example is perfectly valid.

```
vooooooOOOOoOOOOOooOOOOOnvoooooOOooOOoOOooOoOn[je,bonjour]
```

Line breaks are converted to 0.

## String compiler

> The string compiler is tool that will create a .vonvon file which will output specified string.

### Usage

```sh
node string_compiler "string to encode" output_file
node jesuisvonvon output_file
```

Output:
```sh
string to encode
```
