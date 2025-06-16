
export type FixedValue = { 
    category: string, 
    value: string
};

export type Fixed = {
    [key: string]: string | FixedValue;
};

export type Unary = { 
    [key: string]: (x: string) => string; 
};

export type UnaryOptional = {
    [key: string]: (s: string, t: string) => string;
};

export type Binary = {
    [key: string]: (x: string, y: string) => string;
};

export type BinaryBlock<Block> = {
    [key: string]: (x: Block, y: Block) => Block;
};

export type Environment = {
    [key: string]: (s: string) => string;
};

export const getFixedValue = (fixed: Fixed, key: string): string => {
    const data = fixed[key];
    if (typeof data === 'string') {
        return data;
    } else if (data && typeof data === 'object' && 'category' in data) {
        return data.value;
    }
    throw new Error(`Fixed macro "${key}" not found or invalid.`);
};
