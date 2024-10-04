"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCasbinAdapter = void 0;
const helpers_1 = require("../../../helpers");
const common_1 = require("../common");
// -----------------------------------------------------------------------------------------
class AbstractCasbinAdapter {
    constructor(opts) {
        const { scope, datasource } = opts;
        this.logger = helpers_1.LoggerFactory.getLogger([scope]);
        this.datasource = datasource;
    }
    // -----------------------------------------------------------------------------------------
    isFiltered() {
        return true;
    }
    // -----------------------------------------------------------------------------------------
    loadPolicy(_) {
        return Promise.resolve();
    }
    // -----------------------------------------------------------------------------------------
    savePolicy(model) {
        this.logger.info('[savePolicy] Ignore save policy method with options: ', {
            model,
        });
        return Promise.resolve(true);
    }
    // -----------------------------------------------------------------------------------------
    addPolicy(sec, ptype, rule) {
        this.logger.info('[addPolicy] Ignore add policy method with options: ', {
            sec,
            ptype,
            rule,
        });
        return Promise.resolve();
    }
    // -----------------------------------------------------------------------------------------
    removePolicy(sec, ptype, rule) {
        this.logger.info('[removePolicy] Ignore remove policy method with options: ', { sec, ptype, rule });
        return Promise.resolve();
    }
    // -----------------------------------------------------------------------------------------
    removeFilteredPolicy(sec, ptype, fieldIndex, ...fieldValues) {
        switch (ptype) {
            case common_1.EnforcerDefinitions.PREFIX_USER: {
                // Remove user policy
                break;
            }
            case common_1.EnforcerDefinitions.PREFIX_ROLE: {
                // Remove role policy
                break;
            }
            default: {
                break;
            }
        }
        this.logger.info('[removeFilteredPolicy] Ignore remove filtered policy method with options: ', {
            sec,
            ptype,
            fieldIndex,
            fieldValues,
        });
        return Promise.resolve();
    }
}
exports.AbstractCasbinAdapter = AbstractCasbinAdapter;
//# sourceMappingURL=base.adapter.js.map