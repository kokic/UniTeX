"use strict";

import fs from "fs";
import { parse } from "./unitex.js";

import assert from "assert";

const numbers = Array.from({ length: 10 }).map((_, i) => i);

// subscript & supscript

const subscript_test = [
  ...numbers.map((_, i) => `a_${i}`), 
];

const supscript_test = [
  ...numbers.map((_, i) => `p^${i}`), 
];

assert.strictEqual(parse(subscript_test.join("")), "a₀a₁a₂a₃a₄a₅a₆a₇a₈a₉", "subscript assert failed!");

assert.strictEqual(parse(supscript_test.join("")), "p⁰p¹p²p³p⁴p⁵p⁶p⁷p⁸p⁹", "supscript assert failed!");

// font style

assert.strictEqual(parse(String.raw`\N\Z\Q\R\C\A\F`), "ℕℤℚℝℂ𝔸𝔽", "`\\mathbb` abbr assert failed!");

// frac

assert.strictEqual(parse(String.raw`\frac12 + \frac3a - \frac{b}5`), "1/2 + 3/a - b/5", "``\\frac` inline assert failed!");

const pi_cfrac = 
  ' 4                  1²         \n' +
  '---  =  1 + -------------------\n' +
  ' π                    3²       \n' +
  '             2 + ------------- \n' +
  '                        5²     \n' +
  '                  2 + -------  \n' +
  '                       2 + ⋱   ';

assert.strictEqual(parse(String.raw`$$\dfrac{4}{\pi}\;=\;1+\dfrac{1^2}{2+\dfrac{3^2}{2+\dfrac{5^2}{2+\ddots}}}$$`), pi_cfrac, "`\\frac` block assert failed!");

console.log("🎉 All tests passed!");


