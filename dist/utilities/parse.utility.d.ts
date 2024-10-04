export declare const getUID: () => string;
export declare const toCamel: (s: string) => string;
export declare const keysToCamel: (object: object) => any;
export declare const isInt: (n: any) => boolean;
export declare const isFloat: (input: any) => boolean;
export declare const int: (input: any) => number;
export declare const float: (input: any, digit?: number) => number;
export declare const toBoolean: (input: any) => boolean;
export declare const toStringDecimal: (input: any, digit?: number, options?: {
    useLocaleFormat: boolean;
}) => string | 0;
export declare const getNumberValue: (input: string, method?: "int" | "float") => number;
/**
 * Returns an object with the key as the value of the `keyMap` and the value as the object itself.
 *
 * @param arr - The input array
 * @param keyMap - The property key to use as the key in the resulting object
 *
 * Note: In case of duplicate keys, the last element will be used.
 */
export declare const parseArrayToRecordWithKey: <T extends Record<K, PropertyKey>, K extends keyof T>(opts: {
    arr: T[];
    keyMap: K;
}) => Record<T[K], T>;
/**
 * Return a map with the key as the value of the `keyMap` and the value as the object itself.
 *
 * @param arr - The input array
 * @param keyMap - The property key to use as the key in the resulting object
 *
 * Note: In case of duplicate keys, the last element will be used.
 */
export declare const parseArrayToMapWithKey: <T extends Record<K, PropertyKey>, K extends keyof T>(arr: T[], keyMap: K) => Map<T[K], T>;
