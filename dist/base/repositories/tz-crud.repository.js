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
exports.TzCrudRepository = void 0;
const helpers_1 = require("../../helpers");
const utilities_1 = require("../../utilities");
const base_repository_1 = require("./base.repository");
const get_1 = __importDefault(require("lodash/get"));
// ----------------------------------------------------------------------------------------------------------------------------------------
class TzCrudRepository extends base_repository_1.AbstractTzRepository {
    constructor(entityClass, dataSource, scope) {
        super(entityClass, dataSource, scope);
    }
    existsWith(where, options) {
        return new Promise((resolve, reject) => {
            this.findOne({ where }, options)
                .then(rs => {
                resolve(rs !== null && rs !== undefined);
            })
                .catch(reject);
        });
    }
    create(data, options) {
        var _a;
        let enriched = this.mixTimestamp(data, {
            newInstance: true,
            ignoreModified: (_a = options === null || options === void 0 ? void 0 : options.ignoreModified) !== null && _a !== void 0 ? _a : false,
        });
        enriched = this.mixUserAudit(enriched, {
            newInstance: true,
            authorId: options === null || options === void 0 ? void 0 : options.authorId,
        });
        return super.create(enriched, options);
    }
    createAll(datum, options) {
        const enriched = datum.map(data => {
            var _a;
            const tmp = this.mixTimestamp(data, {
                newInstance: true,
                ignoreModified: (_a = options === null || options === void 0 ? void 0 : options.ignoreModified) !== null && _a !== void 0 ? _a : false,
            });
            return this.mixUserAudit(tmp, {
                newInstance: true,
                authorId: options === null || options === void 0 ? void 0 : options.authorId,
            });
        });
        return super.createAll(enriched, options);
    }
    /*
     * @deprecated | Redundant | Please .create
     */
    createWithReturn(data, options) {
        return this.create(data, options);
    }
    updateById(id, data, options) {
        var _a;
        let enriched = this.mixTimestamp(data, {
            newInstance: false,
            ignoreModified: (_a = options === null || options === void 0 ? void 0 : options.ignoreModified) !== null && _a !== void 0 ? _a : false,
        });
        enriched = this.mixUserAudit(enriched, {
            newInstance: false,
            authorId: options === null || options === void 0 ? void 0 : options.authorId,
        });
        return super.updateById(id, enriched, options);
    }
    updateWithReturn(id, data, options) {
        return new Promise((resolve, reject) => {
            this.updateById(id, data, options)
                .then(() => {
                this.findById(id, undefined, options)
                    .then(rs => {
                    resolve(rs);
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    updateAll(data, where, options) {
        var _a;
        let enriched = this.mixTimestamp(data, {
            newInstance: false,
            ignoreModified: (_a = options === null || options === void 0 ? void 0 : options.ignoreModified) !== null && _a !== void 0 ? _a : false,
        });
        enriched = this.mixUserAudit(enriched, {
            newInstance: false,
            authorId: options === null || options === void 0 ? void 0 : options.authorId,
        });
        return super.updateAll(enriched, where, options);
    }
    upsertWith(data, where, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExisted = yield this.existsWith(where, options);
            if (isExisted) {
                yield this.updateAll(data, where, options);
                const rs = yield this.findOne({ where }, options);
                return rs;
            }
            const rs = yield this.create(data, options);
            return rs;
        });
    }
    replaceById(id, data, options) {
        var _a;
        let enriched = this.mixTimestamp(data, {
            newInstance: false,
            ignoreModified: (_a = options === null || options === void 0 ? void 0 : options.ignoreModified) !== null && _a !== void 0 ? _a : false,
        });
        enriched = this.mixUserAudit(enriched, {
            newInstance: false,
            authorId: options === null || options === void 0 ? void 0 : options.authorId,
        });
        return super.replaceById(id, enriched, options);
    }
    _softDelete(where, options) {
        return new Promise((resolve, reject) => {
            const { databaseSchema, connectorType = 'postgresql', softDeleteField = 'isDeleted', useIgnoreModified = false, authorId, } = options !== null && options !== void 0 ? options : {};
            const tableName = this.modelClass.definition.tableName(connectorType);
            const softDeleteColumnName = this.modelClass.definition.columnName(connectorType, softDeleteField);
            // Mix Timestamp
            const mixTimestampColumnName = this.modelClass.definition.columnName(connectorType, 'modifiedAt');
            const schema = (0, get_1.default)(this.modelClass.definition.settings, `${connectorType}.schema`, 'public');
            // Mix User Audit
            const mixUserAuditColumnName = this.modelClass.definition.columnName(connectorType, 'modifiedBy');
            const isSoftDeleteFieldExist = (0, get_1.default)(this.modelClass.definition.rawProperties, softDeleteField);
            if (!isSoftDeleteFieldExist) {
                throw (0, utilities_1.getError)({
                    message: `[softDelete] Model: ${this.modelClass.name} | Soft delete is not supported!`,
                });
            }
            const now = new Date();
            this.find({ fields: { id: true }, where })
                .then(rs => {
                var _a;
                const sqlBuilder = helpers_1.QueryBuilderHelper.getPostgresQueryBuilder()
                    .withSchema((_a = databaseSchema !== null && databaseSchema !== void 0 ? databaseSchema : schema) !== null && _a !== void 0 ? _a : 'public')
                    .from(tableName)
                    .update({ [softDeleteColumnName]: true })
                    .whereIn('id', rs.map(el => el.id));
                if (mixTimestampColumnName && !useIgnoreModified) {
                    sqlBuilder.update(mixTimestampColumnName, now);
                }
                if (mixUserAuditColumnName && authorId) {
                    sqlBuilder.update(mixUserAuditColumnName, authorId);
                }
                this.execute(sqlBuilder.toQuery(), null, options)
                    .then(res => {
                    resolve({ count: res.count });
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    softDelete(where, options) {
        return new Promise((resolve, reject) => {
            this._softDelete(where, options)
                .then(rs => {
                resolve(rs);
                this.notifyObservers({
                    operation: 'after softDelete',
                    where,
                    options,
                    data: rs,
                });
            })
                .catch(error => {
                reject(error);
                this.notifyObservers({
                    operation: 'after softDelete error',
                    where,
                    options,
                    data: null,
                });
            });
        });
    }
    mixTimestamp(entity, options = {
        newInstance: false,
        ignoreModified: false,
    }) {
        if (options === null || options === void 0 ? void 0 : options.newInstance) {
            entity.createdAt = new Date();
        }
        if (!options.ignoreModified) {
            entity.modifiedAt = new Date();
        }
        return entity;
    }
    mixUserAudit(entity, options) {
        if (!(options === null || options === void 0 ? void 0 : options.authorId)) {
            return entity;
        }
        if (options === null || options === void 0 ? void 0 : options.newInstance) {
            entity.createdBy = options.authorId;
        }
        entity.modifiedBy = options.authorId;
        return entity;
    }
    _deleteWithReturn(where, options) {
        return new Promise((resolve, reject) => {
            this.find({ where })
                .then(found => {
                this.deleteAll(where, options)
                    .then(count => resolve({ count, data: found }))
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    deleteWithReturn(where, options) {
        return new Promise((resolve, reject) => {
            this._deleteWithReturn(where, options)
                .then(rs => {
                resolve(rs);
                this.notifyObservers({
                    operation: 'after deleteWithReturn',
                    where,
                    options,
                    data: rs,
                });
            })
                .catch(e => {
                reject(e);
                this.notifyObservers({
                    operation: 'after deleteWithReturn error',
                    where,
                    options,
                    data: null,
                });
            });
        });
    }
}
exports.TzCrudRepository = TzCrudRepository;
//# sourceMappingURL=tz-crud.repository.js.map