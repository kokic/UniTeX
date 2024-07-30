
export type Lazy<α> = { type: "lazy", run: () => α };

export const of = <α>(run: () => α): Lazy<α> => ({ type: "lazy", run });

export const run = <α extends object>(val: α | Lazy<α>) => 
  "type" in val && val.type == "lazy" ? val.run() : val as α;
