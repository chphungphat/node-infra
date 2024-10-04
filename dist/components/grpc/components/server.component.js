"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GrpcServerComponent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcServerComponent = void 0;
const applications_1 = require("../../../base/applications");
const base_component_1 = require("../../../base/base.component");
const core_1 = require("@loopback/core");
const common_1 = require("../common");
const helpers_1 = require("../helpers");
const grpc_js_1 = require("@grpc/grpc-js");
const path_1 = require("path");
let GrpcServerComponent = GrpcServerComponent_1 = class GrpcServerComponent extends base_component_1.BaseComponent {
    constructor(application) {
        var _a;
        super({ scope: GrpcServerComponent_1.name });
        this.application = application;
        this.bindings = [
            core_1.Binding.bind(common_1.GrpcServerKeys.GRPC_OPTIONS).to({
                identifier: 'grpc-server',
                protoFolder: (0, path_1.join)(__dirname),
                address: +((_a = process.env.APP_ENV_SERVER_PORT) !== null && _a !== void 0 ? _a : 3000) + 1,
            }),
        ];
        this.binding();
    }
    defineServer() {
        const grpcOptions = this.application.getSync(common_1.GrpcServerKeys.GRPC_OPTIONS);
        this.logger.info('[defineServer] Grpc Options: %j', grpcOptions);
        const { identifier, serverOptions, address, credentials = grpc_js_1.ServerCredentials.createInsecure() } = grpcOptions;
        const server = new helpers_1.GrpcServer({
            identifier,
            address,
            credentials,
            options: serverOptions,
            injectionGetter: (key) => this.application.getSync(key),
        });
        server.start();
        this.application.bind(common_1.GrpcServerKeys.SERVER_INSTANCE).to(server);
    }
    binding() {
        this.logger.info('[binding] Binding grpc component for application...');
        if (process.env.RUN_MODE === 'migrate') {
            return;
        }
        this.defineServer();
    }
};
exports.GrpcServerComponent = GrpcServerComponent;
exports.GrpcServerComponent = GrpcServerComponent = GrpcServerComponent_1 = __decorate([
    __param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    __metadata("design:paramtypes", [applications_1.BaseApplication])
], GrpcServerComponent);
//# sourceMappingURL=server.component.js.map