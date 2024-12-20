
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
  
- environment
  ```
  % source & target
  \begin{pmatrix} 
     \cos\theta & -\sin\theta \\
     \sin\theta & \cos\theta 
  \end{pmatrix}
  
  ((cosθ -sinθ)(sinθ cosθ))
  ```
    
   
  --- 
  
  
  
  ```
  % source & target
  \theorem (Wedderburn). All finite fields are commutative. 
  \proof. Omitted.
  
  \lemma. If K is a commutative field, every finite subgroup of K^\times is cyclic.
  
  𝐓𝐡𝐞𝐨𝐫𝐞𝐦 (Wedderburn). All finite fields are commutative. 
  𝑝𝑟𝑜𝑜𝑓. Omitted.
  
  𝐋𝐞𝐦𝐦𝐚. If K is a commutative field, every finite subgroup of Kˣ is cyclic.
  ```

- inline formula

  |source| `$J = [\frac{\partial f_1}{\partial x_1} \cdots \frac{\partial f_n}{\partial x_n}]$` |
  |-|-|
  |target| 𝐽 = [(∂ 𝑓₁)/(∂ 𝑥₁) ⋯ (∂ 𝑓ₙ)/(∂ 𝑥ₙ)] |

- block formula

  ```
  % source & target
  $$\dfrac{4}{\pi}\;=\;1+\dfrac{1^2}{2+\dfrac{3^2}{2+\dfrac{5^2}{2+\ddots}}}$$
  
   4                  1²         
  ---  =  1 + -------------------
   π                    3²       
               2 + ------------- 
                          5²     
                    2 + -------  
                         2 + ⋱   
  ```

## TODO

- **Some basic or commonly used macro commands**. ideally including but not limited to the functions in [MathJax](https://www.mathjax.org/) and [KaTeX](https://katex.org), They have some differences in the supported macros. This project will prefer the latter design (i.e. [Supported Functions](https://katex.org/docs/supported.html)).
  - [ ] fixed
    - [x] greek letters
    - [x] unicode block 79 : mathematical operators
      - [x] 220x ~ 226x
      - [x] 227x ~ 22Fx 
    - [x] delimiters
    - [x] arrows
    - [x] operators
      - [x] big operators
      - [x] operator names
      - [x] combined operator names
    - [x] theorem environment
    - [ ] vertical layout
    - [x] spacing
  - [ ] unary
    - [ ] accents
    - [x] font family
    - [ ] extensible arrows
    - [x] optionals (e.g. sqrt)
  - [ ] binary
    - [x] relations operators
    - [x] fractions (inline)
    - [x] fractions (block)
    - [ ] binomials
  - [ ] environments
    - [x] matrix (inline)
    - [ ] matrix (block)
    - [ ] array
    - [x] typeface (math env)
    - [x] typesetting (block)
    - [ ] align
  - [ ] macros
    - [ ] def
    - [ ] command

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

- bun

## Build

```sh
npm run build
```

## License
UniTeX is licensed under the [MIT License](https://github.com/kokic/UniTeX/blob/main/LICENSE). 
