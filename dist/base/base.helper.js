"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHelper = void 0;
const helpers_1 = require("../helpers");
class BaseHelper {
    constructor(opts) {
        this.logger = helpers_1.LoggerFactory.getLogger([opts.scope]);
        this.identifier = opts.identifier;
    }
}
exports.BaseHelper = BaseHelper;
//# sourceMappingURL=base.helper.js.map