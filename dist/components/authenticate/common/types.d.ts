import { AnyObject, ClassType, IdType, ValueOrPromise } from '../../../common';
import { RequestContext } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
export interface IJWTTokenPayload extends UserProfile {
    userId: IdType;
    roles: {
        id: IdType;
        identifier: string;
        priority: number;
    }[];
    clientId?: string;
}
export interface ITokenPayload extends IJWTTokenPayload {
}
export type TGetTokenExpiresFn = () => ValueOrPromise<number>;
export interface IAuthenticateTokenOptions {
    tokenSecret: string;
    tokenExpiresIn: number;
    refreshExpiresIn: number;
    refreshSecret: string;
}
export interface IAuthenticateRestOptions<SIRQ extends SignInRequest = SignInRequest, SURQ extends SignUpRequest = SignUpRequest, CPRQ extends ChangePasswordRequest = ChangePasswordRequest> {
    restPath?: string;
    serviceKey?: string;
    requireAuthenticatedSignUp?: boolean;
    signInRequest?: ClassType<SIRQ>;
    signUpRequest?: ClassType<SURQ>;
    changePasswordRequest?: ClassType<CPRQ>;
}
export interface IAuthenticateOAuth2RestOptions {
    restPath?: string;
    tokenPath?: string;
    authorizePath?: string;
    oauth2ServiceKey?: string;
}
export interface IAuthenticateOAuth2Options {
    enable: boolean;
    handler: {
        type: 'authorization_code';
        authServiceKey: string;
    };
    restOptions?: IAuthenticateOAuth2RestOptions;
    viewFolder?: string;
}
export declare class SignInRequest {
    identifier: {
        scheme: string;
        value: string;
    };
    credential: {
        scheme: string;
        value: string;
    };
    clientId?: string;
}
export declare class ChangePasswordRequest {
    oldCredential: {
        scheme: string;
        value: string;
    };
    newCredential: {
        scheme: string;
        value: string;
    };
    userId: IdType;
}
export declare class SignUpRequest {
    username: string;
    credential: string;
    [additional: string | symbol]: any;
}
export declare class OAuth2Request {
    clientId: string;
    clientSecret: string;
    redirectUrl: string;
}
export interface IAuthService<SIRQ extends SignInRequest = SignInRequest, SIRS = AnyObject, SURQ extends SignUpRequest = SignUpRequest, SURS = AnyObject, CPRQ extends ChangePasswordRequest = ChangePasswordRequest, CPRS = AnyObject, UIRQ = AnyObject, UIRS = AnyObject> {
    signIn(opts: SIRQ & {
        requestContext?: RequestContext;
    }): Promise<SIRS>;
    signUp(opts: SURQ & {
        requestContext?: RequestContext;
    }): Promise<SURS>;
    changePassword(opts: CPRQ & {
        requestContext?: RequestContext;
    }): Promise<CPRS>;
    getUserInformation?(opts: UIRQ & {
        requestContext?: RequestContext;
    }): Promise<UIRS>;
}
