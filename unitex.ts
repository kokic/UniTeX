
import Fixed from "./src/impl/unicode/fixed";
import Unary from "./src/impl/unicode/unary";

import { translate, Binary } from "./src/impl/unicode";

export const UniTeX = {
  parse: translate, fixed: Fixed, unary: Unary, binary: Binary,
};
