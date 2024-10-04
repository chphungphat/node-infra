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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RequestSpyMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestSpyMiddleware = void 0;
const base_provider_1 = require("../base/base.provider");
const parse_utility_1 = require("../utilities/parse.utility");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const set_1 = __importDefault(require("lodash/set"));
let RequestSpyMiddleware = RequestSpyMiddleware_1 = class RequestSpyMiddleware extends base_provider_1.BaseProvider {
    constructor() {
        super({ scope: RequestSpyMiddleware_1.name });
    }
    handle(context) {
        var _a;
        try {
            const { request } = context;
            const requestId = (0, parse_utility_1.getUID)();
            (0, set_1.default)(request, 'requestId', requestId);
            const { url = '', method, body, query, path } = request;
            const requestUrl = (_a = decodeURIComponent(url)) === null || _a === void 0 ? void 0 : _a.replace(/(?:\r\n|\r|\n| )/g, '');
            const requestedRemark = {
                id: requestId,
                url: requestUrl,
                method,
                path: path !== null && path !== void 0 ? path : 'N/A',
                query: query !== null && query !== void 0 ? query : 'N/A',
                body,
            };
            (0, set_1.default)(request, 'requestedRemark', requestedRemark);
            this.logger.info('[spy][%s] Requested remark: %j', requestId, requestedRemark);
        }
        catch (error) {
            this.logger.error('[spy] Failed to spy request information | Error: %s', error);
        }
    }
    value() {
        return (context, next) => {
            this.handle(context);
            return next();
        };
    }
};
exports.RequestSpyMiddleware = RequestSpyMiddleware;
exports.RequestSpyMiddleware = RequestSpyMiddleware = RequestSpyMiddleware_1 = __decorate([
    (0, core_1.injectable)((0, rest_1.asMiddleware)({
        chain: rest_1.RestTags.REST_MIDDLEWARE_CHAIN,
        group: rest_1.RestMiddlewareGroups.FIND_ROUTE,
    })),
    __metadata("design:paramtypes", [])
], RequestSpyMiddleware);
//# sourceMappingURL=request-spy.middleware.js.map