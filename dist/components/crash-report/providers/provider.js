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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrashReportProvider = void 0;
const applications_1 = require("../../../base/applications");
const utilities_1 = require("../../../utilities");
const core_1 = require("@loopback/core");
const common_1 = require("../common");
let CrashReportProvider = class CrashReportProvider {
    constructor(application) {
        this.application = application;
    }
    value() {
        return (opts) => {
            switch (opts.identifier) {
                case common_1.CrashReportProviderKeys.MT_PROVIDER: {
                    const service = this.application.getSync('services.MTCrashReportService');
                    return service;
                }
                case common_1.CrashReportProviderKeys.SENTRY_PROVIDER: {
                    throw (0, utilities_1.getError)({ message: '[CrashReportProvider] SENTRY Provider is not supported' });
                }
                default: {
                    throw (0, utilities_1.getError)({
                        message: `[CrashReportProvider] Invaid third party identifier | identifier: ${opts.identifier}`,
                    });
                }
            }
        };
    }
};
exports.CrashReportProvider = CrashReportProvider;
exports.CrashReportProvider = CrashReportProvider = __decorate([
    __param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    __metadata("design:paramtypes", [applications_1.BaseApplication])
], CrashReportProvider);
//# sourceMappingURL=provider.js.map