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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineOAuth2Controller = exports.DefaultOAuth2ExpressServer = void 0;
const common_1 = require("../../../common");
const helpers_1 = require("../../../helpers");
const utilities_1 = require("../../../utilities");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const oauth2_server_1 = require("@node-oauth/oauth2-server");
const services_1 = require("../services");
const controllers_1 = require("../../../base/controllers");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const path_1 = require("path");
const common_2 = require("../common");
// --------------------------------------------------------------------------------
class DefaultOAuth2ExpressServer extends rest_1.ExpressServer {
    constructor(opts) {
        super(opts.config, opts.parent);
        this.authServiceKey = opts.authServiceKey;
        this.injectionGetter = opts.injectionGetter;
        this.viewFolder = opts.viewFolder;
        this.logger = helpers_1.LoggerFactory.getLogger([DefaultOAuth2ExpressServer.name]);
        this.binding();
    }
    static getInstance(opts) {
        if (!this.instance) {
            this.instance = new DefaultOAuth2ExpressServer(opts);
            return this.instance;
        }
        return this.instance;
    }
    getApplicationHandler() {
        return this.expressApp;
    }
    binding() {
        var _a, _b, _c;
        this.expressApp.set('view engine', 'ejs');
        const oauth2ViewFolder = (_b = (_a = this.viewFolder) !== null && _a !== void 0 ? _a : helpers_1.applicationEnvironment.get(common_1.EnvironmentKeys.APP_ENV_OAUTH2_VIEW_FOLDER)) !== null && _b !== void 0 ? _b : (0, path_1.join)(__dirname, '../', 'views');
        this.expressApp.set('views', oauth2ViewFolder);
        this.logger.info('[binding] View folder: %s', oauth2ViewFolder);
        const basePath = (_c = helpers_1.applicationEnvironment.get(common_1.EnvironmentKeys.APP_ENV_SERVER_BASE_PATH)) !== null && _c !== void 0 ? _c : '';
        const authAction = `${basePath}/oauth2/auth`;
        this.logger.info('[binding] Auth action path: %s', authAction);
        // -----------------------------------------------------------------------------------------------------------------
        this.expressApp.get('/auth', (request, response) => {
            var _a;
            const { c, r } = request.query;
            if (!c) {
                response.render('pages/auth', {
                    message: 'Invalid client credential | Please verify query params!',
                    payload: {},
                });
                return;
            }
            const payload = {
                title: `${helpers_1.applicationEnvironment.get(common_1.EnvironmentKeys.APP_ENV_APPLICATION_NAME)} OAuth`,
                action: authAction,
                c: decodeURIComponent(c.toString()),
                r: decodeURIComponent((_a = r === null || r === void 0 ? void 0 : r.toString()) !== null && _a !== void 0 ? _a : ''),
            };
            response.render('pages/auth', {
                message: 'Please fill out your credential!',
                payload,
            });
        });
        // -----------------------------------------------------------------------------------------------------------------
        this.expressApp.post('/auth', (request, response) => {
            const { username, password, token, redirectUrl } = request.body;
            const requiredProps = [
                { key: 'username', value: username },
                { key: 'password', value: username },
                { key: 'token', value: username },
                { key: 'redirectUrl', value: username },
            ];
            for (const prop of requiredProps) {
                if ((prop === null || prop === void 0 ? void 0 : prop.value) && !(0, isEmpty_1.default)(prop === null || prop === void 0 ? void 0 : prop.value)) {
                    continue;
                }
                this.logger.error('[oauth2][post] Missing prop: %s | key: %s | value: %s', prop.key, prop.key, prop.value);
                response.render('pages/error', {
                    message: `Missing prop ${prop.key} | Please check again authentication form | Make sure username, password, token and redirectUrl parameters are all available in form!`,
                });
                return;
            }
            const oauth2Service = this.injectionGetter('services.OAuth2Service');
            const decryptedClient = oauth2Service.decryptClientToken({ token });
            oauth2Service
                .doOAuth2({
                context: { request, response },
                authServiceKey: this.authServiceKey,
                signInRequest: {
                    identifier: { scheme: 'username', value: username },
                    credential: { scheme: 'basic', value: password },
                    clientId: decryptedClient.clientId,
                },
                redirectUrl,
            })
                .then(rs => {
                const { accessToken, accessTokenExpiresAt, client } = rs.oauth2TokenRs;
                if (!accessTokenExpiresAt) {
                    response.render('pages/error', {
                        message: 'Failed to validate accessToken expiration | Please try to request again!',
                    });
                    return;
                }
                oauth2Service
                    .doClientCallback({ c: token, oauth2Token: rs.oauth2TokenRs })
                    .then(() => {
                    const url = new URL(rs.redirectUrl);
                    url.searchParams.append('c', encodeURIComponent(token));
                    url.searchParams.append('clientId', client.clientId);
                    url.searchParams.append('accessToken', accessToken);
                    response.redirect(url.toString());
                })
                    .catch(error => {
                    throw error;
                });
            })
                .catch(error => {
                var _a;
                response.render('pages/error', {
                    message: `${(_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Failed to authenticate'} | Please try to request again!`,
                });
            });
        });
    }
}
exports.DefaultOAuth2ExpressServer = DefaultOAuth2ExpressServer;
// --------------------------------------------------------------------------------
const defineOAuth2Controller = (opts) => {
    var BaseOAuth2Controller_1;
    const { restPath = '/oauth2', tokenPath = '/token', authorizePath = '/authorize', oauth2ServiceKey = 'services.OAuth2Service',
    // authStrategy = { name: `${applicationEnvironment.get<string>(EnvironmentKeys.APP_ENV_APPLICATION_NAME)}_oauth2` },
     } = opts !== null && opts !== void 0 ? opts : {};
    let BaseOAuth2Controller = BaseOAuth2Controller_1 = class BaseOAuth2Controller extends controllers_1.BaseController {
        constructor(authService, getCurrentUser, httpContext) {
            super({ scope: BaseOAuth2Controller_1.name });
            this.service = authService;
            this.getCurrentUser = getCurrentUser;
            this.httpContext = httpContext;
        }
        // ------------------------------------------------------------------------------
        whoami() {
            return this.getCurrentUser();
        }
        // ------------------------------------------------------------------------------
        generateToken() {
            const { request, response } = this.httpContext;
            return this.service.generateToken({
                request: new oauth2_server_1.Request(request),
                response: new oauth2_server_1.Response(response),
            });
        }
        // ------------------------------------------------------------------------------
        authorize() {
            const { request, response } = this.httpContext;
            return this.service.authorize({
                request: new oauth2_server_1.Request(request),
                response: new oauth2_server_1.Response(response),
            });
        }
        // ------------------------------------------------------------------------------
        getOAuth2RequestPath(payload) {
            return this.service.getOAuth2RequestPath(payload);
        }
    };
    __decorate([
        (0, authentication_1.authenticate)(common_2.Authentication.STRATEGY_JWT),
        (0, rest_1.get)('/who-am-i'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseOAuth2Controller.prototype, "whoami", null);
    __decorate([
        (0, rest_1.post)(tokenPath),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseOAuth2Controller.prototype, "generateToken", null);
    __decorate([
        (0, rest_1.post)(authorizePath),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseOAuth2Controller.prototype, "authorize", null);
    __decorate([
        (0, rest_1.post)('/request'),
        __param(0, (0, rest_1.requestBody)({
            required: true,
            content: {
                'application/json': {
                    schema: (0, utilities_1.getSchemaObject)(common_2.OAuth2Request),
                },
            },
        })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [common_2.OAuth2Request]),
        __metadata("design:returntype", void 0)
    ], BaseOAuth2Controller.prototype, "getOAuth2RequestPath", null);
    BaseOAuth2Controller = BaseOAuth2Controller_1 = __decorate([
        (0, rest_1.api)({ basePath: restPath }),
        __metadata("design:paramtypes", [services_1.OAuth2Service, Function, rest_1.RequestContext])
    ], BaseOAuth2Controller);
    (0, core_1.inject)(oauth2ServiceKey)(BaseOAuth2Controller, undefined, 0);
    core_1.inject.getter(security_1.SecurityBindings.USER, { optional: true })(BaseOAuth2Controller, undefined, 1);
    (0, core_1.inject)(rest_1.RestBindings.Http.CONTEXT)(BaseOAuth2Controller, undefined, 2);
    return BaseOAuth2Controller;
};
exports.defineOAuth2Controller = defineOAuth2Controller;
//# sourceMappingURL=oauth2.controller.js.map