"use strict";
var _a, _b;
var _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MimeTypes = exports.UserTypes = exports.ConfigurationDataType = exports.EntityRelations = exports.ApplicationRunModes = exports.Sorts = exports.ResultCodes = exports.ApplicationRoles = exports.Formatters = exports.App = void 0;
class App {
}
exports.App = App;
App.APPLICATION_NAME = (_a = process.env.APP_ENV_APPLICATION_NAME) !== null && _a !== void 0 ? _a : 'APP';
App.APPLICATION_SECRET = (_b = process.env.APP_ENV_APPLICATION_SECRET) !== null && _b !== void 0 ? _b : 'application.secret';
App.DEFAULT_LOCALE = 'en.UTF-8';
App.DEFAULT_EXPLORER_PATH = '/explorer';
App.DEFAULT_QUERY_LIMIT = 50;
class Formatters {
}
exports.Formatters = Formatters;
Formatters.DATE_TIME = 'YYYY-MM-DD HH:mm:ss';
Formatters.DATE_TIME_2 = 'YYYYMMDDHHmmss';
Formatters.DATE_1 = 'YYYY-MM-DD';
Formatters.DATE_2 = 'YYYYMMDD';
Formatters.TIME_1 = 'HH:mm:ss';
Formatters.TIME_2 = 'HHmmssSSS';
Formatters.MONTH_1 = 'YYYYMM';
class ApplicationRoles {
}
exports.ApplicationRoles = ApplicationRoles;
ApplicationRoles.API = 'api';
class ResultCodes {
}
exports.ResultCodes = ResultCodes;
ResultCodes.RS_FAIL = 0;
ResultCodes.RS_SUCCESS = 1;
ResultCodes.RS_UNKNOWN_ERROR = -199;
class Sorts {
}
exports.Sorts = Sorts;
Sorts.DESC = 'desc';
Sorts.ASC = 'asc';
class ApplicationRunModes {
}
exports.ApplicationRunModes = ApplicationRunModes;
ApplicationRunModes.MODE_START_UP = 'startup';
ApplicationRunModes.MODE_MIGRATE = 'migrate';
ApplicationRunModes.MODE_SEED = 'seed';
class EntityRelations {
    static isValid(type) {
        return this.TYPE_SET.has(type);
    }
}
exports.EntityRelations = EntityRelations;
_c = EntityRelations;
EntityRelations.BELONGS_TO = 'belongsTo';
EntityRelations.HAS_ONE = 'hasOne';
EntityRelations.HAS_MANY = 'hasMany';
EntityRelations.HAS_MANY_THROUGH = 'hasManyThrough';
EntityRelations.TYPE_SET = new Set([_c.BELONGS_TO, _c.HAS_ONE, _c.HAS_MANY, _c.HAS_MANY_THROUGH]);
class ConfigurationDataType {
    static isValid(orgType) {
        return this.TYPE_SET.has(orgType);
    }
}
exports.ConfigurationDataType = ConfigurationDataType;
_d = ConfigurationDataType;
ConfigurationDataType.NUMBER = 'NUMBER';
ConfigurationDataType.TEXT = 'TEXT';
ConfigurationDataType.BYTE = 'BYTE';
ConfigurationDataType.JSON = 'JSON';
ConfigurationDataType.BOOLEAN = 'BOOLEAN';
ConfigurationDataType.TYPE_SET = new Set([_d.NUMBER, _d.TEXT, _d.BYTE, _d.JSON, _d.BOOLEAN]);
class UserTypes {
    static isValid(orgType) {
        return this.TYPE_SET.has(orgType);
    }
}
exports.UserTypes = UserTypes;
_e = UserTypes;
UserTypes.SYSTEM = 'SYSTEM';
UserTypes.LINKED = 'LINKED';
UserTypes.TYPE_SET = new Set([_e.SYSTEM, _e.LINKED]);
class MimeTypes {
}
exports.MimeTypes = MimeTypes;
MimeTypes.UNKNOWN = 'unknown';
MimeTypes.IMAGE = 'image';
MimeTypes.VIDEO = 'video';
MimeTypes.TEXT = 'text';
//# sourceMappingURL=constants.js.map