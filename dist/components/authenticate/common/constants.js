"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationTokenTypes = exports.Authentication = void 0;
class Authentication {
}
exports.Authentication = Authentication;
Authentication.ACCESS_TOKEN_SECRET = 'token.secret';
Authentication.ACCESS_TOKEN_EXPIRES_IN = 86400;
Authentication.REFRESH_TOKEN_SECRET = 'refresh.secret';
Authentication.REFRESH_TOKEN_EXPIRES_IN = 86400;
// Jwt
Authentication.TYPE_BASIC = 'Basic';
Authentication.TYPE_BEARER = 'Bearer';
// Strategy
Authentication.STRATEGY_BASIC = 'basic';
Authentication.STRATEGY_JWT = 'jwt';
class AuthenticationTokenTypes {
}
exports.AuthenticationTokenTypes = AuthenticationTokenTypes;
AuthenticationTokenTypes.TYPE_AUTHORIZATION_CODE = '000_AUTHORIZATION_CODE';
AuthenticationTokenTypes.TYPE_ACCESS_TOKEN = '100_ACCESS_TOKEN';
AuthenticationTokenTypes.TYPE_REFRESH_TOKEN = '200_REFRESH_TOKEN';
//# sourceMappingURL=constants.js.map