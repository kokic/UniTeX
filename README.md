
# UniTeX
A transpiler that converts TeX into Unicode (as possible). 

## Usage
```js
UniTeX.parse(source: string)
```

## Example

- text formula

  | source | target || source | target |
  | - | - | - | - | - |
  | `\TeX` | TᴇX || `\LaTeX` | LᴬTᴇX |
  | `\KaTeX` | KᴬTᴇX || `\UniTeX` | UⁿᵢTᴇX |

  | source | target |
  | - | - |
  | `a^2 + b^2 = c^2` | a² + b² = c² |

  | source | `\ell(D) - \ell(K-D) = \deg D - g + 1` |
  | - | - |
  | target | ℓ(D) - ℓ(K-D) = deg D - g + 1 |

  | source | `E[m] \simeq \Z/m\Z \times \Z/m\Z, \text{Gal}(\bar a/a) \rarr \text{Aut}(E[m])` | 
  | - | - |
  | target | E[m] ≃ ℤ/mℤ × ℤ/mℤ, Gal(ā/a) → Aut(E[m]) |


## TODO

- **Some basic or commonly used macro commands**. ideally including but not limited to the functions in [MathJax](https://www.mathjax.org/) and [KaTeX](https://katex.org), They have some differences in the supported macros. This project will prefer the latter design (i.e. [Supported Functions](https://katex.org/docs/supported.html)).
  - [ ] Fixed
    - [x] Greek Letters
    - [x] Unicode Block 79 : Mathematical Operators
      - [x] 220x ~ 226x
      - [x] 227x ~ 22Fx 
    - [x] Delimiters
    - [x] Arrows
    - [x] Operators
      - [x] Big Operators
      - [x] Operator Names
      - [x] Combined Operator Names
    - [x] Theorem Environment
    - [ ] Vertical Layout
    - [x] Spacing
  - [ ] Unary
    - [ ] Accents (hard)
    - [x] Font Family
    - [ ] Extensible Arrows
    - [x] Optionals (sqrt)
  - [ ] Binary
    - [x] Relations Operators
    - [x] Fractions (inline)
    - [x] (**cmdline only**) Fractions (block)
    - [ ] Binomials
  - [ ] Environments
    - [x] Matrix (inline)
    - [ ] (**cmdline only**) Matrix (block)
    - [x] Typeface (math env)
    - [x] Typesetting (block)
    - [ ] Array
    - [ ] Align Family
    - [ ] (**cmdline only**) AMScd
    - [ ] (**cmdline only**) Tikzcd (hard)
  - [ ] Macros
    - [ ] Def
    - [ ] Command

- **A [website](https://unitex-web.netlify.app) convenient for input and output**. [Source code repository](https://github.com/kokic/UniTeX-Website).

- **Additional unicode characters** and corresponding macro commands ([BabelMap](https://www.babelstone.co.uk/Unicode/babelmap.html)). This is mainly for the macro commands that exist in the common packages of TeX, which are not implemented by KaTeX or MathJax but are supported by Unicode.

- **Multiline Structure**. 

## Future

- **The output is syntactically compatible with [AsciiMath](http://asciimath.org)**, which may be used as the default style or an optional setting. 

- **Terminal versions (in other languages)**. It is suitable for some environments with high performance requirements, so the JVM family (Java, Kotlin, etc.) or Rust will be given priority in language selection. 

<!-- ## Demo -->

<!-- ## Documentation -->

---

## Development

- node.js

## Build (for Browser)

- node.js
- webpack

```
webpack ./unitex.js --mode=none --output-library-type=window
```


## License
UniTeX is licensed under the [MIT License](https://github.com/kokic/UniTeX/blob/main/LICENSE). 


--- 

<!-- ## Acknowledge -->

