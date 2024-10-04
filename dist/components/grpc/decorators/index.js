"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grpcMethod = exports.grpcController = void 0;
const core_1 = require("@loopback/core");
const common_1 = require("../common");
const grpcController = (opts) => {
    return core_1.ClassDecoratorFactory.createDecorator(common_1.METADATA_GRPC_CONTROLLER, opts);
};
exports.grpcController = grpcController;
const grpcMethod = (opts) => {
    return core_1.MethodDecoratorFactory.createDecorator(common_1.METADATA_GRPC_METHOD, opts);
};
exports.grpcMethod = grpcMethod;
//# sourceMappingURL=index.js.map