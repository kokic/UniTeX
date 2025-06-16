import { Fixed } from "../../macro-types";
import Unicode from "../unicode/unicode-table";

const FixedTheorem: Fixed = {
  proposition: { category: 'UniTeX', value: Unicode.render_if_exists('Proposition', 'textbf') },
  lemma: { category: 'UniTeX', value: Unicode.render_if_exists('Lemma', 'textbf') },
  theorem: { category: 'UniTeX', value: Unicode.render_if_exists('Theorem', 'textbf') },
  corollary: { category: 'UniTeX', value: Unicode.render_if_exists('Corollary', 'textbf') },
  definition: { category: 'UniTeX', value: Unicode.render_if_exists('Definition', 'textbf') },
  remark: { category: 'UniTeX', value: Unicode.render_if_exists('Remark', 'textbf') },
  hypothesis: { category: 'UniTeX', value: Unicode.render_if_exists('Hypothesis', 'textbf') },
  conjecture: { category: 'UniTeX', value: Unicode.render_if_exists('Conjecture', 'textbf') },
  axiom: { category: 'UniTeX', value: Unicode.render_if_exists('Axiom', 'textbf') },
  example: { category: 'UniTeX', value: Unicode.render_if_exists('Example', 'textbf') },
  proof: { category: 'UniTeX', value: Unicode.render_if_exists('proof', 'textit') },
};

export default FixedTheorem;
