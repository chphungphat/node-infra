import { IdType, TInjectionGetter } from '../../../common';
import { ApplicationLogger } from '../../../helpers';
import { Context, Getter } from '@loopback/core';
import { ExpressServer, ExpressServerConfig, RequestContext } from '@loopback/rest';
import { OAuth2Service } from '../services';
import { IAuthenticateOAuth2RestOptions, OAuth2Request } from '../common';
interface IOAuth2ControllerOptions {
    config?: ExpressServerConfig | undefined;
    parent?: Context;
    authServiceKey: string;
    injectionGetter: TInjectionGetter;
    viewFolder?: string;
}
export declare class DefaultOAuth2ExpressServer extends ExpressServer {
    private static instance;
    private authServiceKey;
    private injectionGetter;
    private viewFolder?;
    private logger;
    constructor(opts: IOAuth2ControllerOptions);
    static getInstance(opts: IOAuth2ControllerOptions): DefaultOAuth2ExpressServer;
    getApplicationHandler(): import("express").Application;
    binding(): void;
}
export declare const defineOAuth2Controller: (opts?: IAuthenticateOAuth2RestOptions) => {
    new (authService: OAuth2Service, getCurrentUser: Getter<{
        userId: IdType;
    }>, httpContext: RequestContext): {
        service: OAuth2Service;
        getCurrentUser: Getter<{
            userId: IdType;
        }>;
        httpContext: RequestContext;
        whoami(): Promise<{
            userId: IdType;
        }>;
        generateToken(): Promise<import("@node-oauth/oauth2-server").Token>;
        authorize(): Promise<import("@node-oauth/oauth2-server").AuthorizationCode>;
        getOAuth2RequestPath(payload: OAuth2Request): Promise<{
            requestPath: string;
        }>;
        logger: ApplicationLogger;
        defaultLimit: number;
    };
};
export {};
