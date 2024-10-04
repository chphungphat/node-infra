"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkUdpClient = void 0;
const base_helper_1 = require("../../base/base.helper");
const dgram_1 = __importDefault(require("dgram"));
class NetworkUdpClient extends base_helper_1.BaseHelper {
    constructor(opts) {
        var _a, _b, _c, _d;
        super({ scope: NetworkUdpClient.name, identifier: opts.identifier });
        this.host = opts.host;
        this.port = opts.port;
        this.reuseAddr = opts.reuseAddr;
        this.multicastAddress = opts.multicastAddress;
        this.onConnected = (_a = opts === null || opts === void 0 ? void 0 : opts.onConnected) !== null && _a !== void 0 ? _a : this.handleConnected;
        this.onData = (_b = opts === null || opts === void 0 ? void 0 : opts.onData) !== null && _b !== void 0 ? _b : this.handleData;
        this.onClosed = (_c = opts === null || opts === void 0 ? void 0 : opts.onClosed) !== null && _c !== void 0 ? _c : this.handleClosed;
        this.onError = (_d = opts === null || opts === void 0 ? void 0 : opts.onError) !== null && _d !== void 0 ? _d : this.handleError;
        this.onBind = opts === null || opts === void 0 ? void 0 : opts.onBind;
    }
    static newInstance(opts) {
        return new NetworkUdpClient(opts);
    }
    getClient() {
        return this.client;
    }
    handleConnected() {
        this.logger.info('[handleConnected][%s] Successfully bind connection | Options: %j', this.identifier, {
            host: this.host,
            port: this.port,
            multicastAddress: this.multicastAddress,
        });
    }
    handleData(opts) {
        this.logger.info('[handleData][%s][%s:%d][<==] Raw: %s', this.identifier, this.host, this.port, {
            message: opts.message,
            remoteInfo: opts.remoteInfo,
        });
    }
    handleClosed() {
        this.logger.info('[handleClosed][%s] Closed connection TCP Server | Options: %j', this.identifier, {
            host: this.host,
            port: this.port,
            multicastAddress: this.multicastAddress,
        });
    }
    handleError(opts) {
        this.logger.error('[handleError][%s] Connection error | Options: %j | Error: %s', this.identifier, {
            host: this.host,
            port: this.port,
        }, opts.error);
    }
    connect() {
        if (this.client) {
            this.logger.info('[connect][%s] UdpClient is already initialized!', this.identifier);
            return;
        }
        if (!this.port) {
            this.logger.info('[connect][%s] Cannot init UDP Client with null options', this.identifier);
            return;
        }
        this.logger.info('[connect][%s] New network udp client | Host: %s | Port: %s | multicastAddress: %j', this.identifier, this.host, this.port, this.multicastAddress);
        this.client = dgram_1.default.createSocket({ type: 'udp4', reuseAddr: this.reuseAddr });
        this.client.on('close', () => {
            var _a;
            (_a = this.onClosed) === null || _a === void 0 ? void 0 : _a.call(this, { identifier: this.identifier, host: this.host, port: this.port });
        });
        this.client.on('error', error => {
            var _a;
            (_a = this.onError) === null || _a === void 0 ? void 0 : _a.call(this, { identifier: this.identifier, host: this.host, port: this.port, error });
        });
        this.client.on('listening', () => {
            var _a;
            (_a = this.onConnected) === null || _a === void 0 ? void 0 : _a.call(this, { identifier: this.identifier, host: this.host, port: this.port });
        });
        this.client.on('message', (message, remoteInfo) => {
            var _a;
            (_a = this.onData) === null || _a === void 0 ? void 0 : _a.call(this, { identifier: this.identifier, message, remoteInfo });
        });
        this.client.bind({ port: this.port, address: this.host }, () => {
            var _a;
            (_a = this.onBind) === null || _a === void 0 ? void 0 : _a.call(this, {
                identifier: this.identifier,
                socket: this.client,
                host: this.host,
                port: this.port,
                reuseAddr: this.reuseAddr,
                multicastAddress: this.multicastAddress,
            });
        });
    }
    disconnect() {
        var _a;
        if (!this.client) {
            this.logger.info('[disconnect][%s] UdpClient is not initialized yet!', this.identifier);
            return;
        }
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.close();
        this.client = null;
        this.logger.info('[disconnect][%s] UdpClient is destroyed!', this.identifier);
    }
    isConnected() {
        return this.client;
    }
}
exports.NetworkUdpClient = NetworkUdpClient;
//# sourceMappingURL=network-udp-client.helper.js.map