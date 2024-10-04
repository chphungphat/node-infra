"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCrashReportProvider = exports.AbstractCrashReportProvider = void 0;
const helpers_1 = require("../../../../helpers");
class AbstractCrashReportProvider {
}
exports.AbstractCrashReportProvider = AbstractCrashReportProvider;
class BaseCrashReportProvider extends AbstractCrashReportProvider {
    constructor(opts) {
        var _a;
        super();
        this.logger = helpers_1.LoggerFactory.getLogger([(_a = opts === null || opts === void 0 ? void 0 : opts.scope) !== null && _a !== void 0 ? _a : BaseCrashReportProvider.name]);
    }
}
exports.BaseCrashReportProvider = BaseCrashReportProvider;
//# sourceMappingURL=base.js.map