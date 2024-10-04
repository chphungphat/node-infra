"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcServer = void 0;
const helpers_1 = require("../../../helpers");
const utilities_1 = require("../../../utilities");
const core_1 = require("@loopback/core");
const common_1 = require("../common");
const grpc = __importStar(require("@grpc/grpc-js"));
const grpcLoader = __importStar(require("@grpc/proto-loader"));
const fs_1 = require("fs");
const get_1 = __importDefault(require("lodash/get"));
const path_1 = require("path");
class GrpcServer extends grpc.Server {
    // ---------------------------------------------------------------------
    constructor(opts) {
        const { identifier, address, credentials, options = {}, injectionGetter } = opts;
        super(options);
        this.identifier = identifier;
        this.address = address;
        this.credentials = credentials;
        this.injectionGetter = injectionGetter;
        this.logger = helpers_1.LoggerFactory.getLogger([this.identifier]);
        this.logger.info(' Initializing GrpcServer | Options: %j', options);
        this.bindingServices();
    }
    // ---------------------------------------------------------------------
    start() {
        if (!this.address) {
            throw (0, utilities_1.getError)({
                message: '[GrpcServer][start] Invalid start up server address!',
            });
        }
        this.bindAsync(`${this.address}`, this.credentials, (error, port) => {
            if (error) {
                this.logger.error('[defineServer] Failed to init grpc server | Error: %s', error);
                return;
            }
            this.logger.info('[defineServer] Successfully binding grpc server | Port: %s', port);
        });
    }
    // ---------------------------------------------------------------------
    setupHandler(opts) {
        const { controller, method } = opts;
        return (call, next) => {
            var _a, _b, _c;
            const instance = this.injectionGetter(`controllers.${(_a = controller.valueConstructor) === null || _a === void 0 ? void 0 : _a.name}`);
            if (!(instance === null || instance === void 0 ? void 0 : instance[method])) {
                throw (0, utilities_1.getError)({
                    message: `[setupHandler] Invalid implementation instance method | Controller: ${(_b = controller === null || controller === void 0 ? void 0 : controller.valueConstructor) === null || _b === void 0 ? void 0 : _b.name} | method: ${method}`,
                });
            }
            Promise.resolve((_c = instance === null || instance === void 0 ? void 0 : instance[method]) === null || _c === void 0 ? void 0 : _c.call(instance, call.request))
                .then(rs => {
                next(null, rs);
            })
                .catch(next);
        };
    }
    // ---------------------------------------------------------------------
    loadService(opts) {
        const { service, protoFile } = opts;
        const grpcOptions = this.injectionGetter(common_1.GrpcServerKeys.GRPC_OPTIONS);
        const { protoFolder } = grpcOptions;
        const protoPath = (0, path_1.join)(protoFolder, protoFile);
        const isProtoFileExisted = (0, fs_1.existsSync)(protoPath);
        if (!isProtoFileExisted) {
            this.logger.error('[bindingService] Proto file not found | protoFolder: %s | protoFile: %s', protoFolder, protoFile);
            return null;
        }
        const packageDef = grpcLoader.loadSync(protoPath);
        const proto = grpc.loadPackageDefinition(packageDef);
        const serviceConstructor = (0, get_1.default)(proto, service);
        return serviceConstructor.service;
    }
    // ---------------------------------------------------------------------
    bindingService(opts) {
        var _a, _b, _c, _d, _e;
        const t = performance.now();
        const { controller } = opts;
        this.logger.info('[bindingService] Controller: %s | START binding grpc service', (_a = controller === null || controller === void 0 ? void 0 : controller.valueConstructor) === null || _a === void 0 ? void 0 : _a.name);
        const methodDescriptors = core_1.MetadataInspector.getAllMethodMetadata(common_1.METADATA_GRPC_METHOD, (_b = controller.valueConstructor) === null || _b === void 0 ? void 0 : _b.prototype);
        if (!methodDescriptors) {
            this.logger.error('[bindingService] Controller: %s | Invalid method method descriptor map', (_c = controller === null || controller === void 0 ? void 0 : controller.valueConstructor) === null || _c === void 0 ? void 0 : _c.name);
            return;
        }
        const services = {};
        for (const methodName in methodDescriptors) {
            const methodDescriptor = (0, get_1.default)(methodDescriptors, methodName);
            if (!methodDescriptor) {
                this.logger.error('[bindingService] Controller: %s | method: %s | Skip binding service | Invalid method method descriptor', (_d = controller === null || controller === void 0 ? void 0 : controller.valueConstructor) === null || _d === void 0 ? void 0 : _d.name, methodName);
                continue;
            }
            this.logger.info('[bindingService] Method descriptor: %j', methodDescriptor);
            const { proto: protoFile, service, method = methodName } = methodDescriptor;
            const serviceDef = this.loadService({ service, protoFile });
            if (!serviceDef) {
                this.logger.error('[bindingService] Service: %s | protoFile: %s | Skip binding service | Invalid service definition', service, protoFile);
                continue;
            }
            if (!services[service]) {
                services[service] = { serviceDef, methods: {} };
            }
            services[service].methods[method] = this.setupHandler({
                controller,
                method,
            });
        }
        for (const name in services) {
            const { serviceDef, methods } = services[name];
            this.addService(serviceDef, methods);
            this.logger.info('[bindingService] serviceName: %s | Successfully add grpc service!', name);
        }
        this.logger.info('[bindingService] Controller: %s | DONE binding grpc service | Took: %d(ms)', (_e = controller === null || controller === void 0 ? void 0 : controller.valueConstructor) === null || _e === void 0 ? void 0 : _e.name, performance.now() - t);
    }
    // ---------------------------------------------------------------------
    bindingServices() {
        const application = this.injectionGetter(core_1.CoreBindings.APPLICATION_INSTANCE);
        const controllers = application.findByTag(common_1.GrpcTags.CONTROLLERS);
        this.logger.info('[bindingServices][controllers] Controllers: %j', controllers);
        for (const controller of controllers) {
            this.bindingService({ controller });
        }
    }
}
exports.GrpcServer = GrpcServer;
//# sourceMappingURL=grpc-server.js.map