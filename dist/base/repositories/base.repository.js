"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewRepository = exports.KVRepository = exports.AbstractKVRepository = exports.AbstractTzRepository = exports.WhereBuilder = void 0;
const helpers_1 = require("../../helpers");
const utilities_1 = require("../../utilities");
const repository_1 = require("@loopback/repository");
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const get_1 = __importDefault(require("lodash/get"));
// ----------------------------------------------------------------------------------------------------------------------------------------
class WhereBuilder extends repository_1.WhereBuilder {
    constructor(opts) {
        super(opts);
    }
    newInstance(opts) {
        return new WhereBuilder(opts);
    }
    clone() {
        return new WhereBuilder((0, cloneDeep_1.default)(this.build()));
    }
}
exports.WhereBuilder = WhereBuilder;
// ----------------------------------------------------------------------------------------------------------------------------------------
class AbstractTzRepository extends repository_1.DefaultCrudRepository {
    constructor(entityClass, dataSource, scope) {
        super(entityClass, dataSource);
        this.logger = helpers_1.LoggerFactory.getLogger([scope !== null && scope !== void 0 ? scope : '']);
    }
    beginTransaction(options) {
        return new Promise((resolve, reject) => {
            this.dataSource
                .beginTransaction(options !== null && options !== void 0 ? options : {})
                .then(rs => {
                resolve(rs);
            })
                .catch(reject);
        });
    }
    executeSql(command, parameters, options) {
        return this.execute(command, parameters, options);
    }
    getObservers(opts) {
        const { operation } = opts;
        return (0, get_1.default)(this.modelClass, `_observers.${operation}`, []);
    }
    notifyObservers(opts) {
        const { operation } = opts, rest = __rest(opts, ["operation"]);
        const observers = this.getObservers({ operation });
        observers.forEach(observer => observer(Object.assign(Object.assign({}, this.modelClass), rest)));
    }
}
exports.AbstractTzRepository = AbstractTzRepository;
// ----------------------------------------------------------------------------------------------------------------------------------------
class AbstractKVRepository extends repository_1.DefaultKeyValueRepository {
    constructor(entityClass, dataSource) {
        super(entityClass, dataSource);
    }
}
exports.AbstractKVRepository = AbstractKVRepository;
// ----------------------------------------------------------------------------------------------------------------------------------------
class KVRepository extends AbstractKVRepository {
    constructor(entityClass, dataSource) {
        super(entityClass, dataSource);
    }
}
exports.KVRepository = KVRepository;
// ----------------------------------------------------------------------------------------------------------------------------------------
class ViewRepository extends repository_1.DefaultCrudRepository {
    constructor(entityClass, dataSource) {
        super(entityClass, dataSource);
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
    create(_data, _options) {
        throw (0, utilities_1.getError)({
            statusCode: 500,
            message: 'Cannot manipulate entity with view repository!',
        });
    }
    createAll(_datum, _options) {
        throw (0, utilities_1.getError)({
            statusCode: 500,
            message: 'Cannot manipulate entity with view repository!',
        });
    }
    save(_entity, _options) {
        throw (0, utilities_1.getError)({
            statusCode: 500,
            message: 'Cannot manipulate entity with view repository!',
        });
    }
    update(_entity, _options) {
        throw (0, utilities_1.getError)({
            statusCode: 500,
            message: 'Cannot manipulate entity with view repository!',
        });
    }
    delete(_entity, _options) {
        throw (0, utilities_1.getError)({
            statusCode: 500,
            message: 'Cannot manipulate entity with view repository!',
        });
    }
    updateAll(_data, _where, _options) {
        throw (0, utilities_1.getError)({
            statusCode: 500,
            message: 'Cannot manipulate entity with view repository!',
        });
    }
    updateById(_id, _data, _options) {
        throw (0, utilities_1.getError)({
            statusCode: 500,
            message: 'Cannot manipulate entity with view repository!',
        });
    }
    replaceById(_id, _data, _options) {
        throw (0, utilities_1.getError)({
            statusCode: 500,
            message: 'Cannot manipulate entity with view repository!',
        });
    }
    deleteAll(_where, _options) {
        throw (0, utilities_1.getError)({
            statusCode: 500,
            message: 'Cannot manipulate entity with view repository!',
        });
    }
    deleteById(_id, _options) {
        throw (0, utilities_1.getError)({
            statusCode: 500,
            message: 'Cannot manipulate entity with view repository!',
        });
    }
}
exports.ViewRepository = ViewRepository;
//# sourceMappingURL=base.repository.js.map