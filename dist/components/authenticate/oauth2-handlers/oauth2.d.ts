import { ApplicationLogger } from '../../../helpers';
import OAuth2Server, { ServerOptions } from '@node-oauth/oauth2-server';
import { TInjectionGetter } from '../../../common';
export declare class OAuth2Handler extends OAuth2Server {
    logger: ApplicationLogger;
    constructor(opts: {
        scope?: string;
        handlerOptions: {
            type: 'authorization_code';
            authServiceKey: string;
            injectionGetter: TInjectionGetter;
        };
        serverOptions: Omit<ServerOptions, 'model'>;
    });
}
