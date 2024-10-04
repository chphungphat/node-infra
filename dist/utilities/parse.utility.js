"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArrayToMapWithKey = exports.parseArrayToRecordWithKey = exports.getNumberValue = exports.toStringDecimal = exports.toBoolean = exports.float = exports.int = exports.isFloat = exports.isInt = exports.keysToCamel = exports.toCamel = exports.getUID = void 0;
const get_1 = __importDefault(require("lodash/get"));
const round_1 = __importDefault(require("lodash/round"));
const error_utility_1 = require("./error.utility");
// -------------------------------------------------------------------------
const INTL_0_DIGITS_FORMATER = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
});
const INTL_2_DIGITS_FORMATER = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
});
// -------------------------------------------------------------------------
const getUID = () => Math.random().toString(36).slice(2).toUpperCase();
exports.getUID = getUID;
// -------------------------------------------------------------------------
const toCamel = (s) => {
    return s.replace(/([-_][a-z])/gi, (sub) => {
        return sub.toUpperCase().replace('-', '').replace('_', '');
    });
};
exports.toCamel = toCamel;
// -------------------------------------------------------------------------
const keysToCamel = (object) => {
    const n = {};
    const keys = Object.keys(object);
    for (const key of keys) {
        const value = (0, get_1.default)(object, key);
        let valueType = typeof value;
        if (Array.isArray(value)) {
            valueType = 'array';
        }
        else if (value instanceof Date) {
            valueType = 'date';
        }
        switch (valueType) {
            case 'object': {
                if (!value) {
                    n[(0, exports.toCamel)(key)] = value;
                    break;
                }
                n[(0, exports.toCamel)(key)] = (0, exports.keysToCamel)(value);
                break;
            }
            /* case 'array': {
              n[toCamel(key)] = value;
              break;
            } */
            default: {
                n[(0, exports.toCamel)(key)] = value;
                break;
            }
        }
    }
    return n;
};
exports.keysToCamel = keysToCamel;
// -------------------------------------------------------------------------
const isInt = (n) => {
    if (isNaN(n)) {
        return false;
    }
    return Number.isInteger(n) || Math.floor(Number(n)) === n || Number(n) % 1 === 0;
};
exports.isInt = isInt;
// -------------------------------------------------------------------------
const isFloat = (input) => {
    if (isNaN(input)) {
        return false;
    }
    return Number(input) === input || Number(input) % 1 !== 0;
};
exports.isFloat = isFloat;
// -------------------------------------------------------------------------
const int = (input) => {
    var _a, _b;
    if (!input || isNaN(input)) {
        return 0;
    }
    const normalized = (_a = input === null || input === void 0 ? void 0 : input.toString()) === null || _a === void 0 ? void 0 : _a.replace(/,/g, '');
    return (_b = Number.parseInt(normalized, 10)) !== null && _b !== void 0 ? _b : 0;
};
exports.int = int;
// -------------------------------------------------------------------------
const float = (input, digit = 2) => {
    var _a;
    if (!input || isNaN(input)) {
        return 0;
    }
    const normalized = (_a = input === null || input === void 0 ? void 0 : input.toString()) === null || _a === void 0 ? void 0 : _a.replace(/,/g, '');
    return (0, round_1.default)(Number.parseFloat(normalized), digit);
};
exports.float = float;
// -------------------------------------------------------------------------
const toBoolean = (input) => {
    var _a;
    return ((_a = (input !== 'false' && input !== '0' && input !== false && input !== 0 && input !== null && input !== undefined)) !== null && _a !== void 0 ? _a : Boolean(input));
};
exports.toBoolean = toBoolean;
// -------------------------------------------------------------------------
const toStringDecimal = (input, digit = 2, options = { useLocaleFormat: true }) => {
    const { useLocaleFormat } = options;
    if (isNaN(input)) {
        return 0;
    }
    let number = 0;
    if ((0, exports.isInt)(input)) {
        number = (0, exports.int)(input);
    }
    else {
        number = (0, exports.float)(input, digit);
    }
    if (!useLocaleFormat) {
        return number.toFixed(digit);
    }
    if (Number.isInteger(number)) {
        return INTL_0_DIGITS_FORMATER.format(number);
    }
    if (digit === 2) {
        return INTL_2_DIGITS_FORMATER.format(number);
    }
    const formater = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: digit,
        minimumFractionDigits: digit,
    });
    return formater.format(number);
};
exports.toStringDecimal = toStringDecimal;
// -------------------------------------------------------------------------
const getNumberValue = (input, method = 'int') => {
    if (!input) {
        return 0;
    }
    let raw;
    switch (typeof input) {
        case 'string': {
            raw = input.replace(/,|\./gi, '');
            break;
        }
        default: {
            raw = input;
            break;
        }
    }
    switch (method) {
        case 'int': {
            return (0, exports.int)(raw);
        }
        default: {
            return (0, exports.float)(raw);
        }
    }
};
exports.getNumberValue = getNumberValue;
// ---------------------------------------------------------
/**
 * Returns an object with the key as the value of the `keyMap` and the value as the object itself.
 *
 * @param arr - The input array
 * @param keyMap - The property key to use as the key in the resulting object
 *
 * Note: In case of duplicate keys, the last element will be used.
 */
const parseArrayToRecordWithKey = (opts) => {
    const { arr, keyMap } = opts;
    const resultRecord = {};
    if (!arr.length) {
        return resultRecord;
    }
    arr.forEach(element => {
        if (!(keyMap in element)) {
            throw (0, error_utility_1.getError)({
                message: 'Invalid keyMap',
            });
        }
        resultRecord[element[keyMap]] = element;
    });
    return resultRecord;
};
exports.parseArrayToRecordWithKey = parseArrayToRecordWithKey;
// ---------------------------------------------------------
/**
 * Return a map with the key as the value of the `keyMap` and the value as the object itself.
 *
 * @param arr - The input array
 * @param keyMap - The property key to use as the key in the resulting object
 *
 * Note: In case of duplicate keys, the last element will be used.
 */
const parseArrayToMapWithKey = (arr, keyMap) => {
    const resultMap = new Map();
    if (!arr.length) {
        return resultMap;
    }
    arr.forEach(element => {
        if (!(keyMap in element)) {
            throw (0, error_utility_1.getError)({
                message: 'Invalid keyMap',
            });
        }
        resultMap.set(element[keyMap], element);
    });
    return resultMap;
};
exports.parseArrayToMapWithKey = parseArrayToMapWithKey;
//# sourceMappingURL=parse.utility.js.map