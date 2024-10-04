"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationLogger = exports.applicationLogFormatter = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const common_1 = require("../../common");
const LOGGER_FOLDER_PATH = (_a = process.env.APP_ENV_LOGGER_FOLDER_PATH) !== null && _a !== void 0 ? _a : './';
const LOGGER_PREFIX = common_1.App.APPLICATION_NAME;
const consoleLogTransport = new winston_1.transports.Console({
    level: 'debug',
});
const infoLogTransport = new winston_1.transports.DailyRotateFile({
    frequency: '1h',
    maxSize: '100m',
    maxFiles: '5d',
    datePattern: 'YYYYMMDD_HH',
    filename: path_1.default.join(LOGGER_FOLDER_PATH, `/${LOGGER_PREFIX}-info-%DATE%.log`),
    level: 'info',
});
const errorLogTransport = new winston_1.transports.DailyRotateFile({
    frequency: '1h',
    maxSize: '100m',
    maxFiles: '5d',
    datePattern: 'YYYYMMDD_HH',
    filename: path_1.default.join(LOGGER_FOLDER_PATH, `/${LOGGER_PREFIX}-error-%DATE%.log`),
    level: 'error',
});
exports.applicationLogFormatter = winston_1.format.combine(winston_1.format.label({ label: LOGGER_PREFIX }), winston_1.format.splat(), winston_1.format.align(), winston_1.format.timestamp(), winston_1.format.simple(), winston_1.format.colorize(), winston_1.format.printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`), winston_1.format.errors({ stack: true }));
exports.applicationLogger = (0, winston_1.createLogger)({
    format: exports.applicationLogFormatter,
    exitOnError: false,
    transports: [consoleLogTransport, infoLogTransport, errorLogTransport],
    exceptionHandlers: [consoleLogTransport, errorLogTransport],
});
//# sourceMappingURL=default-logger.js.map