"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationLogger = void 0;
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const default_logger_1 = require("./default-logger");
const LOG_ENVIRONMENTS = new Set(['development', 'alpha', 'beta', 'staging']);
class Logger {
    constructor() {
        this.scopes = [];
        this._environment = process.env.NODE_ENV;
    }
    withScope(scope) {
        if (this.scopes.length < 2) {
            this.scopes.push(scope);
            return this;
        }
        while (this.scopes.length > 2) {
            this.scopes.pop();
        }
        this.scopes[1] = scope;
        return this;
    }
    _enhanceMessage(parts, message) {
        const enhanced = parts === null || parts === void 0 ? void 0 : parts.reduce((prevState = '', current) => {
            if ((0, isEmpty_1.default)(prevState)) {
                return current;
            }
            return prevState.concat(`-${current}`);
        }, '');
        return `[${enhanced}]${message}`;
    }
    debug(message, ...args) {
        if (this._environment && !LOG_ENVIRONMENTS.has(this._environment)) {
            return;
        }
        if (!default_logger_1.applicationLogger) {
            throw new Error('Invalid logger instance!');
        }
        if (!process.env.DEBUG) {
            return;
        }
        const enhanced = this._enhanceMessage(this.scopes, message);
        default_logger_1.applicationLogger.log('debug', enhanced, ...args);
    }
    info(message, ...args) {
        if (!default_logger_1.applicationLogger) {
            throw new Error('Invalid logger instance!');
        }
        const enhanced = this._enhanceMessage(this.scopes, message);
        default_logger_1.applicationLogger.log('info', enhanced, ...args);
    }
    error(message, ...args) {
        if (!default_logger_1.applicationLogger) {
            throw new Error('Invalid logger instance!');
        }
        const enhanced = this._enhanceMessage(this.scopes, message);
        default_logger_1.applicationLogger.log('error', enhanced, ...args);
    }
}
class ApplicationLogger extends Logger {
}
exports.ApplicationLogger = ApplicationLogger;
//# sourceMappingURL=application-logger.js.map