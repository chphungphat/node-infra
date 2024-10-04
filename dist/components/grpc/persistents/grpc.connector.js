"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcConnector = void 0;
const helpers_1 = require("../../../helpers");
const helpers_2 = require("../helpers");
class GrpcConnector {
    constructor(opts) {
        this.logger = helpers_1.LoggerFactory.getLogger([GrpcConnector.name]);
        const { host, port, credentials, serviceClassResolver } = opts;
        this.host = host;
        this.port = port;
        this.credentials = credentials;
        this.serviceClassResolver = serviceClassResolver;
        this.binding();
    }
    binding() {
        this.grpcClient = (0, helpers_2.initializeGrpcClient)({
            serviceClass: this.serviceClassResolver(),
            address: `${this.host}:${this.port}`,
            credentials: this.credentials,
        });
    }
    connect() {
        return Promise.resolve(this.grpcClient.connect());
    }
    disconnect() {
        return Promise.resolve(this.grpcClient.disconnect());
    }
    ping() {
        throw new Error('Method not implemented.');
    }
    execute(method, parameters) {
        var _a;
        const client = this.grpcClient.client;
        return (_a = client[method]) === null || _a === void 0 ? void 0 : _a.call(client, ...parameters);
    }
}
exports.GrpcConnector = GrpcConnector;
//# sourceMappingURL=grpc.connector.js.map