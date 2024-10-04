"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasbinRedisAdapter = void 0;
const base_adapter_1 = require("./base.adapter");
// -----------------------------------------------------------------------------------------
class CasbinRedisAdapter extends base_adapter_1.AbstractCasbinAdapter {
    constructor(datasource) {
        super({ scope: CasbinRedisAdapter.name, datasource });
    }
    loadFilteredPolicy(_model, _filter) {
        throw new Error('Method not implemented.');
    }
}
exports.CasbinRedisAdapter = CasbinRedisAdapter;
//# sourceMappingURL=casbin-redis-adapter.helper.js.map