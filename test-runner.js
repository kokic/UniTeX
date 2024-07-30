"use strict";

import assert from "assert";
import { translate } from "./src/impl/unicode";

const numbers = Array.from({ length: 10 }).map((_, i) => i);

// subscript & supscript

const subscript_test = [
  ...numbers.map((_, i) => `a_${i}`), 
];

const supscript_test = [
  ...numbers.map((_, i) => `p^${i}`), 
];

assert.strictEqual(
  translate(subscript_test.join("")), 
  "a₀a₁a₂a₃a₄a₅a₆a₇a₈a₉", 
  "subscript assert failed!"
);

assert.strictEqual(
  translate(supscript_test.join("")), 
  "p⁰p¹p²p³p⁴p⁵p⁶p⁷p⁸p⁹", 
  "supscript assert failed!"
);

// font style

assert.strictEqual(
  translate(String.raw`\N\Z\Q\R\C\A\F`), 
  "ℕℤℚℝℂ𝔸𝔽", 
  "`\\mathbb` abbr assert failed!"
);

// bar
assert.strictEqual(
  translate(String.raw`\text{Gal}(\bar a/a) \rarr \text{Aut}(E[m])`), 
  "Gal(ā/a) → Aut(E[m])"
);

// matrix
assert.strictEqual(
  translate(String.raw
    `\begin{pmatrix}
       \cos\theta & -\sin\theta \\
       \sin\theta & \cos\theta 
       \end{pmatrix}`
  ), 
  `((cosθ -sinθ)(sinθ cosθ))`
);

// frac

assert.strictEqual(
  translate(String.raw`\frac12 + \frac3a - \frac{b}5`), 
  "1/2 + 3/a - b/5", 
  "``\\frac` inline assert failed!"
);

assert.strictEqual(
  translate(String.raw`$$\dfrac12\times\frac{1}p$$`), 
  ' 1     1 \n' +
  '--- × ---\n' + 
  ' 2     p '
);

const pi_cfrac = 
  ' 4                  1²         \n' +
  '---  =  1 + -------------------\n' +
  ' π                    3²       \n' +
  '             2 + ------------- \n' +
  '                        5²     \n' +
  '                  2 + -------  \n' +
  '                       2 + ⋱   ';

assert.strictEqual(
  translate(String.raw`$$\dfrac{4}{\pi}\;=\;1+\dfrac{1^2}{2+\dfrac{3^2}{2+\dfrac{5^2}{2+\ddots}}}$$`), 
  pi_cfrac, 
  "`\\frac` block assert failed!"
);

console.log("🎉 All tests passed!");


