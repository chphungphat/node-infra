import { IdType } from '../../../common';
import { Getter } from '@loopback/core';
import { RequestContext } from '@loopback/rest';
import { ChangePasswordRequest, IAuthenticateRestOptions, IAuthService, SignInRequest, SignUpRequest } from '../common';
export declare const defineAuthController: <SI extends SignInRequest = SignInRequest, SU extends SignUpRequest = SignUpRequest, CP extends ChangePasswordRequest = ChangePasswordRequest>(opts: IAuthenticateRestOptions) => {
    new (requestContext: RequestContext, authService: IAuthService, getCurrentUser: Getter<{
        userId: IdType;
    }>): {
        requestContext: RequestContext;
        service: IAuthService;
        getCurrentUser: Getter<{
            userId: IdType;
        }>;
        whoami(): Promise<{
            userId: IdType;
        }>;
        signIn(payload: SI): Promise<import("../../../common").AnyObject>;
        signUp(payload: SU): Promise<import("../../../common").AnyObject>;
        changePassword(payload: CP): Promise<unknown>;
        logger: import("../../..").ApplicationLogger;
        defaultLimit: number;
    };
};
