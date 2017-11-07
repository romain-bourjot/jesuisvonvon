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


,bonBONjOURmoi]

This program prints what you type.
```

Also, there can be any number of 'o' in the 'vonvon' keyword, thus the next example is perfectly valid.

```
vooooooOOOOoOOOOOooOOOOOnvoooooOOooOOoOOooOoOn[je,bonjour]
```

Line breaks are converted to 0.

## Examples

Code examples are placed in the vonvon directory.

### ft_print_alphabet

Prints the alphabet (lower case).

Result:
```
abcdefghijklmnopqrstuvwxyz
```

### ft_print_reverse_alphabet

Prints the alphabet (lowercase) in reverse order.

Result:

```
zyxwvutsrqponmlkjihgfedcba
```

### ft_print_numbers

Prints integers from 0 to 9

Result:
```
0123456789
```

### ft_print_negative
Prints N if you type a negative number, P otherwise.

### ft_print_comb
Prints all different combinations of three different numbers in increasing order.

Result:
```
012, 013, 014, 015, 016, 017, 018, 019, 023, ..., 789
```

* 987 is not displayed because 789 is already there.
* 001 is not displayed because it has 0 twice.  

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
