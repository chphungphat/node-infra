"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasbinPostgresAdapter = void 0;
const utilities_1 = require("../../../utilities");
const casbin_1 = require("casbin");
const flatten_1 = __importDefault(require("lodash/flatten"));
const get_1 = __importDefault(require("lodash/get"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const common_1 = require("../common");
const base_adapter_1 = require("./base.adapter");
// -----------------------------------------------------------------------------------------
class CasbinPostgresAdapter extends base_adapter_1.AbstractCasbinAdapter {
    constructor(datasource) {
        super({ scope: CasbinPostgresAdapter.name, datasource });
    }
    // -----------------------------------------------------------------------------------------
    generateGroupLine(rule) {
        const { userId, roleId } = rule;
        const rs = [
            common_1.EnforcerDefinitions.PTYPE_GROUP,
            `${common_1.EnforcerDefinitions.PREFIX_USER}_${userId}`,
            `${common_1.EnforcerDefinitions.PREFIX_ROLE}_${roleId}`,
        ];
        return rs.join(',');
    }
    // -----------------------------------------------------------------------------------------
    loadFilteredPolicy(model, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (((_a = filter === null || filter === void 0 ? void 0 : filter.principalType) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'role') {
                throw (0, utilities_1.getError)({
                    statusCode: 500,
                    message: '[loadFilteredPolicy] Only "User" is allowed for filter principal type!',
                });
            }
            const aclQueries = [
                this.datasource.execute(`SELECT * FROM public."ViewAuthorizePolicy" WHERE subject=$1`, [
                    `user_${filter.principalValue}`,
                ]),
            ];
            // Load role permission policies
            const userRoles = yield this.datasource.execute(`SELECT * FROM public."UserRole" WHERE user_id=$1`, [
                filter.principalValue,
            ]);
            for (const userRole of userRoles) {
                const execution = this.datasource.execute(`SELECT * FROM public."ViewAuthorizePolicy" WHERE subject=$1`, [
                    `role_${userRole.principal_id}`,
                ]);
                aclQueries.push(execution);
            }
            // Load policy lines
            const policyRs = (0, flatten_1.default)(yield Promise.all(aclQueries));
            this.logger.debug('[loadFilteredPolicy] policyRs: %j | filter: %j', policyRs, filter);
            for (const el of policyRs) {
                if (!el) {
                    continue;
                }
                (_b = el.policies) === null || _b === void 0 ? void 0 : _b.forEach((policyLine) => {
                    casbin_1.Helper.loadPolicyLine(policyLine, model);
                    this.logger.debug('[loadFilteredPolicy] Load policy: %s', policyLine);
                });
            }
            // Load group lines
            for (const userRole of userRoles) {
                const groupLine = this.generateGroupLine({
                    userId: (0, get_1.default)(userRole, 'user_id'),
                    roleId: (0, get_1.default)(userRole, 'principal_id'),
                });
                if (!groupLine || (0, isEmpty_1.default)(groupLine)) {
                    continue;
                }
                casbin_1.Helper.loadPolicyLine(groupLine, model);
                this.logger.debug('[loadFilteredPolicy] Load groupLine: %s', groupLine);
            }
        });
    }
}
exports.CasbinPostgresAdapter = CasbinPostgresAdapter;
//# sourceMappingURL=casbin-postgres-adapter.helper.js.map