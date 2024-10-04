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
var SearchableTzCrudRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchableTzCrudRepository = void 0;
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const tz_crud_repository_1 = require("./tz-crud.repository");
const get_1 = __importDefault(require("lodash/get"));
const set_1 = __importDefault(require("lodash/set"));
let SearchableTzCrudRepository = SearchableTzCrudRepository_1 = class SearchableTzCrudRepository extends tz_crud_repository_1.TzCrudRepository {
    constructor(entityClass, dataSource, opts, scope) {
        var _a;
        super(entityClass, dataSource, scope !== null && scope !== void 0 ? scope : SearchableTzCrudRepository_1.name);
        this.isInclusionRelations = opts.isInclusionRelations;
        this.searchableInclusions = (_a = opts.searchableInclusions) !== null && _a !== void 0 ? _a : [];
    }
    // ----------------------------------------------------------------------------------------------------
    registerOnInclusionChanged(relation, relationRepositoryGetter) {
        return __awaiter(this, void 0, void 0, function* () {
            const relationRepository = yield relationRepositoryGetter();
            relationRepository.modelClass.observe('after save', (context) => __awaiter(this, void 0, void 0, function* () {
                const { isNewInstance, where, instance, options } = context;
                let entities = [];
                if (isNewInstance) {
                    entities.push(instance);
                }
                else {
                    entities = yield relationRepository.find({ where }, options);
                }
                yield this.onInclusionChanged({ relation, relationRepository, entities, options });
            }));
            relationRepository.modelClass.observe('after deleteWithReturn', (context) => __awaiter(this, void 0, void 0, function* () {
                const { data } = context;
                yield this.onInclusionChanged({
                    relation,
                    relationRepository,
                    entities: data,
                });
            }));
        });
    }
    // ----------------------------------------------------------------------------------------------------
    handleInclusionChanged(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { relationName, relationType, entities, relationRepository, options } = opts;
            const resolved = yield ((_a = relationRepository.inclusionResolvers.get(relationName)) === null || _a === void 0 ? void 0 : _a(entities, {
                relation: relationName,
                scope: {
                    include: this.searchableInclusions,
                },
            }, options));
            const promises = [];
            switch (relationType) {
                case 'belongsTo': {
                    const rs = resolved;
                    if (!(rs === null || rs === void 0 ? void 0 : rs.length)) {
                        break;
                    }
                    for (const r1 of rs) {
                        if (!r1) {
                            continue;
                        }
                        promises.push(this.updateById(r1.id, 
                        // TODO: handle type
                        {
                            objectSearch: this.renderObjectSearch({ entity: r1 }),
                        }, { ignoreMixSearchFields: true, options }));
                    }
                    break;
                }
                case 'hasOne': {
                    break;
                }
                case 'hasMany':
                case 'hasManyThrough': {
                    const rs = resolved;
                    if (!(rs === null || rs === void 0 ? void 0 : rs.length)) {
                        break;
                    }
                    for (const r1 of rs) {
                        if (!(r1 === null || r1 === void 0 ? void 0 : r1.length)) {
                            break;
                        }
                        for (const r2 of r1) {
                            if (!rs) {
                                continue;
                            }
                            promises.push(this.updateById(r2.id, 
                            // TODO: handle type
                            {
                                objectSearch: this.renderObjectSearch({ entity: r2 }),
                            }, { ignoreMixSearchFields: true, options }));
                        }
                    }
                    break;
                }
                default: {
                    break;
                }
            }
            yield Promise.all(promises);
        });
    }
    // ----------------------------------------------------------------------------------------------------
    renderSearchable(field, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = (0, get_1.default)(options, 'where');
            const isSearchable = (0, get_1.default)(this.modelClass.definition.properties, field, null) !== null;
            if (!isSearchable) {
                return null;
            }
            let resolved = [data];
            if (this.isInclusionRelations && this.searchableInclusions.length) {
                resolved = yield this.includeRelatedModels([data], this.searchableInclusions, options);
            }
            switch (field) {
                case 'textSearch': {
                    return this.renderTextSearch({ data, entity: resolved === null || resolved === void 0 ? void 0 : resolved[0] });
                }
                case 'objectSearch': {
                    let currentObjectSearch = {};
                    if (where) {
                        const found = yield this.findOne({
                            where,
                            include: this.searchableInclusions,
                        });
                        if (found) {
                            currentObjectSearch = this.renderObjectSearch({
                                data,
                                entity: found,
                            });
                        }
                    }
                    const newObjectSearch = this.renderObjectSearch({
                        data,
                        entity: resolved === null || resolved === void 0 ? void 0 : resolved[0],
                    });
                    return Object.assign(Object.assign({}, currentObjectSearch), newObjectSearch);
                }
                default: {
                    return null;
                }
            }
        });
    }
    // ----------------------------------------------------------------------------------------------------
    mixSearchFields(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const ignoreMixSearchFields = (0, get_1.default)(options, 'ignoreMixSearchFields');
                if (ignoreMixSearchFields) {
                    return resolve(data);
                }
                Promise.all([
                    this.renderSearchable('textSearch', data, options),
                    this.renderSearchable('objectSearch', data, options),
                ])
                    .then(([ts, os]) => {
                    if (ts) {
                        (0, set_1.default)(data, 'textSearch', ts);
                    }
                    if (os) {
                        (0, set_1.default)(data, 'objectSearch', os);
                    }
                    resolve(data);
                })
                    .catch(reject);
            });
        });
    }
    // ----------------------------------------------------------------------------------------------------
    create(data, options) {
        return new Promise((resolve, reject) => {
            this.mixSearchFields(data, options)
                .then(enriched => {
                resolve(super.create(enriched, options));
            })
                .catch(reject);
        });
    }
    // ----------------------------------------------------------------------------------------------------
    createAll(data, options) {
        return new Promise((resolve, reject) => {
            Promise.all(data.map(el => {
                return this.mixSearchFields(el, options);
            }))
                .then(enriched => {
                resolve(super.createAll(enriched, options));
            })
                .catch(reject);
        });
    }
    // ----------------------------------------------------------------------------------------------------
    updateById(id, data, options) {
        return new Promise((resolve, reject) => {
            this.mixSearchFields(data, Object.assign(Object.assign({}, options), { where: { id } }))
                .then(enriched => {
                resolve(super.updateById(id, enriched, options));
            })
                .catch(reject);
        });
    }
    // ----------------------------------------------------------------------------------------------------
    replaceById(id, data, options) {
        return new Promise((resolve, reject) => {
            this.mixSearchFields(data, options)
                .then(enriched => {
                resolve(super.replaceById(id, enriched, options));
            })
                .catch(reject);
        });
    }
};
exports.SearchableTzCrudRepository = SearchableTzCrudRepository;
exports.SearchableTzCrudRepository = SearchableTzCrudRepository = SearchableTzCrudRepository_1 = __decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.SINGLETON }),
    __metadata("design:paramtypes", [Object, repository_1.juggler.DataSource, Object, String])
], SearchableTzCrudRepository);
//# sourceMappingURL=searchable-tz-crud.repository.js.map