"use strict";

import assert from "assert";
import { translate } from "./src/impl/unicode";

const numbers = Array.from({ length: 10 }).map((_, i) => i);

function standardTest() {

  // subscript & supscript
  const subscriptInputs = numbers.map((_, i) => `a_${i}`);
  const supscriptInputs = numbers.map((_, i) => `p^${i}`);

  assert.strictEqual(
    translate(subscriptInputs.join("")),
    "a₀a₁a₂a₃a₄a₅a₆a₇a₈a₉",
    "subscript assert failed!"
  );

  assert.strictEqual(
    translate(supscriptInputs.join("")),
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

  // inline math
  assert.strictEqual(
    translate(String.raw`$abc \in \mathscr{W}$`),
    "𝑎𝑏𝑐 ∈ 𝒲"
  );

  // block math
  assert.strictEqual(
    translate(String.raw`$$\dfrac12\times\frac{1}p$$`),
    ' 1     1 \n' +
    '--- × ---\n' +
    ' 2     p '
  );

  assert.strictEqual(
    translate(String.raw`$$\frac{a}b \cdot \frac{b}a \; = \; 1$$`),
    ' a     b       \n' +
    '--- ⋅ ---  =  1\n' +
    ' b     a       '
  );

  const piContinuedFrac =
    ' 4                  1²         \n' +
    '---  =  1 + -------------------\n' +
    ' π                    3²       \n' +
    '             2 + ------------- \n' +
    '                        5²     \n' +
    '                  2 + -------  \n' +
    '                       2 + ⋱   ';

  assert.strictEqual(
    translate(String.raw`$$\dfrac{4}{\pi}\;=\;1+\dfrac{1^2}{2+\dfrac{3^2}{2+\dfrac{5^2}{2+\ddots}}}$$`),
    piContinuedFrac,
    "`\\frac` block assert failed!"
  );
};

function extensionTest() {

  assert.strictEqual(
    translate(String.raw`\KaTeX \bTeX \Lean \UniTeX`), 
    "KᴬTᴇX 🍌TᴇX L∃∀N UⁿᵢTᴇX"
  );

  // overset
  assert.strictEqual(
    translate(String.raw`\overset{\Delta}{=} \overset{def}{=} \overset{\star}{=}`),
    "≜ ≝ ≛",
  );

};

standardTest();
extensionTest();

console.log("🎉 All tests passed!");
