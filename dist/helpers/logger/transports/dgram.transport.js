"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DgramTransport = void 0;
const common_1 = require("../../../common");
const utilities_1 = require("../../../utilities");
const dgram_1 = __importDefault(require("dgram"));
const winston_transport_1 = __importDefault(require("winston-transport"));
class DgramTransport extends winston_transport_1.default {
    constructor(opts) {
        const { label, host, port, levels, socketOptions } = opts, defaultTransportOptions = __rest(opts, ["label", "host", "port", "levels", "socketOptions"]);
        super(defaultTransportOptions);
        this.label = label;
        this.host = host;
        this.port = port;
        this.triggerLevels = new Set(levels);
        this.socketOptions = socketOptions;
        this.establish({ socketOptions: this.socketOptions });
    }
    static fromPartial(opts) {
        var _a;
        if (!(opts === null || opts === void 0 ? void 0 : opts.label) ||
            !(opts === null || opts === void 0 ? void 0 : opts.host) ||
            !(opts === null || opts === void 0 ? void 0 : opts.port) ||
            !((_a = opts === null || opts === void 0 ? void 0 : opts.levels) === null || _a === void 0 ? void 0 : _a.length) ||
            !(opts === null || opts === void 0 ? void 0 : opts.socketOptions)) {
            return null;
        }
        return new DgramTransport(opts);
    }
    establish(opts) {
        this.client = dgram_1.default.createSocket(opts.socketOptions);
        this.client.on('error', error => {
            var _a;
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.close();
            this.client = null;
            throw (0, utilities_1.getError)({
                statusCode: common_1.ResultCodes.RS_5.InternalServerError,
                message: `[DgramTransport][error] Error: ${error.message}`,
            });
        });
    }
    formatMessage(opts) {
        var _a;
        const { timestamp, label, message } = opts, rest = __rest(opts, ["timestamp", "label", "message"]);
        return [timestamp, `[${(_a = this.label) !== null && _a !== void 0 ? _a : label}]`, rest[Symbol.for('level')], message].join(' ');
    }
    log(opts, callback) {
        var _a;
        setImmediate(() => {
            this.emit('logged', opts);
        });
        const logLevel = opts[Symbol.for('level')];
        if (!this.triggerLevels.has(logLevel)) {
            callback();
            return;
        }
        if (!this.client) {
            this.establish({ socketOptions: this.socketOptions });
        }
        const message = this.formatMessage(opts);
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.send(message, this.port, this.host, error => {
            if (error) {
                this.emit('error', error);
            }
            callback();
        });
    }
}
exports.DgramTransport = DgramTransport;
//# sourceMappingURL=dgram.transport.js.map