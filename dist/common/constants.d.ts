export declare class App {
    static readonly APPLICATION_NAME: string;
    static readonly APPLICATION_SECRET: string;
    static readonly DEFAULT_LOCALE = "en.UTF-8";
    static readonly DEFAULT_EXPLORER_PATH = "/explorer";
    static readonly DEFAULT_QUERY_LIMIT = 50;
}
export declare class Formatters {
    static readonly DATE_TIME = "YYYY-MM-DD HH:mm:ss";
    static readonly DATE_TIME_2 = "YYYYMMDDHHmmss";
    static readonly DATE_1 = "YYYY-MM-DD";
    static readonly DATE_2 = "YYYYMMDD";
    static readonly TIME_1 = "HH:mm:ss";
    static readonly TIME_2 = "HHmmssSSS";
    static readonly MONTH_1 = "YYYYMM";
}
export declare class ApplicationRoles {
    static readonly API = "api";
}
export declare class ResultCodes {
    static readonly RS_FAIL = 0;
    static readonly RS_SUCCESS = 1;
    static readonly RS_UNKNOWN_ERROR = -199;
}
export declare class Sorts {
    static readonly DESC = "desc";
    static readonly ASC = "asc";
}
export declare class ApplicationRunModes {
    static readonly MODE_START_UP = "startup";
    static readonly MODE_MIGRATE = "migrate";
    static readonly MODE_SEED = "seed";
}
export declare class EntityRelations {
    static readonly BELONGS_TO = "belongsTo";
    static readonly HAS_ONE = "hasOne";
    static readonly HAS_MANY = "hasMany";
    static readonly HAS_MANY_THROUGH = "hasManyThrough";
    static readonly TYPE_SET: Set<string>;
    static isValid(type: string): boolean;
}
export declare class ConfigurationDataType {
    static readonly NUMBER = "NUMBER";
    static readonly TEXT = "TEXT";
    static readonly BYTE = "BYTE";
    static readonly JSON = "JSON";
    static readonly BOOLEAN = "BOOLEAN";
    static readonly TYPE_SET: Set<string>;
    static isValid(orgType: string): boolean;
}
export declare class UserTypes {
    static readonly SYSTEM = "SYSTEM";
    static readonly LINKED = "LINKED";
    static readonly TYPE_SET: Set<string>;
    static isValid(orgType: string): boolean;
}
export declare class MimeTypes {
    static readonly UNKNOWN = "unknown";
    static readonly IMAGE = "image";
    static readonly VIDEO = "video";
    static readonly TEXT = "text";
}
