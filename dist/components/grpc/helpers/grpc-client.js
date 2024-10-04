"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeGrpcClient = exports.GrpcClient = void 0;
const helpers_1 = require("../../../helpers");
const utilities_1 = require("../../../utilities");
class GrpcClient {
    constructor(opts) {
        const { identifier, serviceClass, address, credentials, autoConnect = false, onClientReady } = opts;
        this.identifier = identifier;
        this.logger = helpers_1.LoggerFactory.getLogger([this.identifier]);
        this.serviceClass = serviceClass;
        this.address = address;
        this.credentials = credentials;
        this.onClientReady = onClientReady;
        if (autoConnect) {
            this.connect();
        }
    }
    static fromServiceClient(opts) {
        return new GrpcClient(Object.assign(Object.assign({}, opts), { identifier: opts.serviceClass.name }));
    }
    connect() {
        if (this.client) {
            this.logger.info('[connect] GrpcClient is connected | Skip initializing new client!');
            return;
        }
        const ServiceClass = this.serviceClass;
        if (!ServiceClass) {
            throw (0, utilities_1.getError)({
                message: '[bindingClient] Invalid serviceClass to init grpc client',
            });
        }
        this.client = new ServiceClass(this.address, this.credentials);
        const deadline = (0, utilities_1.dayjs)().add(10, 'seconds').toDate();
        this.client.waitForReady(deadline, error => {
            var _a;
            if (error) {
                this.logger.error('[bindingClient][waitForReady] Client cannot be ready | Error: %s', error);
                return;
            }
            this.logger.info('[bindingClient][waitForReady] GRPC Client: %s | READY', this.identifier);
            (_a = this.onClientReady) === null || _a === void 0 ? void 0 : _a.call(this, { client: this.client });
        });
    }
    disconnect() {
        if (!this.client) {
            this.logger.info('[connect] GrpcClient is not initialized | Skip disconnecting client!');
            return;
        }
        this.client.close();
    }
}
exports.GrpcClient = GrpcClient;
const initializeGrpcClient = (opts) => {
    return GrpcClient.fromServiceClient(opts);
};
exports.initializeGrpcClient = initializeGrpcClient;
//# sourceMappingURL=grpc-client.js.map