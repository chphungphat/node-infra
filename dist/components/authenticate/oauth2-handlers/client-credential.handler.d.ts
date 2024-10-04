import { TInjectionGetter } from '../../../common';
import { Client, ClientCredentialsModel, Falsey, User } from '@node-oauth/oauth2-server';
import { AbstractOAuth2AuthenticationHandler } from './base';
export declare class OAuth2ClientCredentialHandler extends AbstractOAuth2AuthenticationHandler implements ClientCredentialsModel {
    constructor(opts: {
        scope?: string;
        authServiceKey: string;
        injectionGetter: TInjectionGetter;
        serviceKey: string;
    });
    getUserFromClient(client: Client): Promise<User | Falsey>;
}
