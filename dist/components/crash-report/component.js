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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var CrashReportComponent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrashReportComponent = void 0;
const applications_1 = require("../../base/applications");
const base_component_1 = require("../../base/base.component");
const utilities_1 = require("../../utilities");
const core_1 = require("@loopback/core");
const common_1 = require("./common");
const providers_1 = require("./providers");
const services_1 = require("./services");
let CrashReportComponent = CrashReportComponent_1 = class CrashReportComponent extends base_component_1.BaseComponent {
    constructor(application, crashReportProviderGetter) {
        super({ scope: CrashReportComponent_1.name });
        this.application = application;
        this.crashReportProviderGetter = crashReportProviderGetter;
    }
    defineProviders() {
        this.application.bind(common_1.CrashReportKeys.THIRD_PARTY_PROVIDER).toProvider(providers_1.CrashReportProvider);
    }
    defineServices() {
        this.application.service(services_1.MTCrashReportService);
    }
    binding() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!this.application.isBound(common_1.CrashReportKeys.REPORT_PROVIDERS)) {
                throw (0, utilities_1.getError)({
                    message: '[binding] Invalid crash report provider | REPORT_PROVIDER is not bounded to application context',
                });
            }
            const reportProviders = (_a = this.application.getSync(common_1.CrashReportKeys.REPORT_PROVIDERS)) !== null && _a !== void 0 ? _a : [];
            const providerServices = [];
            for (const reportProvider of reportProviders) {
                const { identifier, options } = reportProvider;
                if (!common_1.CrashReportProviderKeys.isValid({ identifier })) {
                    this.logger.error('[binding] Invalid provider identifier: %s | Valid: %j', identifier, [
                        ...common_1.CrashReportProviderKeys.TYPE_SET,
                    ]);
                    continue;
                }
                const service = (yield this.crashReportProviderGetter())({ identifier });
                if (!service) {
                    this.logger.error('[binding] Identifier: %s | Failed to create report service', identifier);
                    continue;
                }
                providerServices.push({ service, options });
            }
            if (!providerServices.length) {
                this.logger.error('[binding] No providerServices to init report!');
                return;
            }
            process.on('uncaughtException', error => {
                Promise.all(providerServices.map(({ service, options }) => {
                    return service.sendReport({ options, error });
                }));
            });
        });
    }
    start() {
        if (!this.application) {
            throw (0, utilities_1.getError)({
                statusCode: 500,
                message: '[start] Invalid application to bind CrashReportComponent',
            });
        }
        this.logger.info('[start] Binding crash report component for application...');
        // Binding providers
        this.defineProviders();
        // Binding services
        this.defineServices();
        // Binding options
        this.binding();
    }
};
exports.CrashReportComponent = CrashReportComponent;
exports.CrashReportComponent = CrashReportComponent = CrashReportComponent_1 = __decorate([
    __param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    __param(1, core_1.inject.getter(common_1.CrashReportKeys.THIRD_PARTY_PROVIDER)),
    __metadata("design:paramtypes", [applications_1.BaseApplication, Function])
], CrashReportComponent);
//# sourceMappingURL=component.js.map