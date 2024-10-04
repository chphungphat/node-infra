"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcRepository = void 0;
const helpers_1 = require("../../../helpers");
const utilities_1 = require("../../../utilities");
class GrpcRepository {
    constructor(opts) {
        this.dataSource = opts.dataSource;
        this.logger = helpers_1.LoggerFactory.getLogger([opts.scope]);
    }
    getServiceClient() {
        var _a, _b, _c;
        if (!this.dataSource.connected) {
            const ServiceClass = this.dataSource.connector.serviceClassResolver();
            throw (0, utilities_1.getError)({
                message: `[getServiceClient] Service: ${ServiceClass.name} | Service client is not connected!`,
            });
        }
        if (!((_c = (_b = (_a = this.dataSource) === null || _a === void 0 ? void 0 : _a.connector) === null || _b === void 0 ? void 0 : _b.grpcClient) === null || _c === void 0 ? void 0 : _c.client)) {
            throw (0, utilities_1.getError)({
                message: `[getServiceClient] Service client is not available | Please initialize before using`,
            });
        }
        return this.dataSource.connector.grpcClient.client;
    }
}
exports.GrpcRepository = GrpcRepository;
//# sourceMappingURL=grpc.repository.js.map