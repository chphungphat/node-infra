import { Getter } from '@loopback/core';
import { IdType } from '../../common';
import { ChangePasswordRequest, IAuthenticationControllerRestOptions, IUserService, SignInRequest, SignUpRequest } from './types';
export declare const defineAuthenticationController: <SI_RQ extends SignInRequest = SignInRequest, SU_RQ extends SignUpRequest = SignUpRequest, CP_RQ extends ChangePasswordRequest = ChangePasswordRequest>(opts: IAuthenticationControllerRestOptions) => {
    new (userService: IUserService, getCurrentUser: Getter<{
        userId: IdType;
    }>): {
        userService: IUserService;
        getCurrentUser: Getter<{
            userId: IdType;
        }>;
        whoami(): Promise<{
            userId: IdType;
        }>;
        signIn(payload: SI_RQ): Promise<import("../../common").AnyObject>;
        signUp(payload: SU_RQ): Promise<import("../../common").AnyObject>;
        changePassword(payload: CP_RQ): Promise<unknown>;
        logger: import("../..").ApplicationLogger;
        defaultLimit: number;
    };
};