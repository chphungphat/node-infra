import { getError } from '@/utilities';
import { Client, ClientCredentialsModel, Falsey, User } from '@node-oauth/oauth2-server';
import { IAuthService } from '../types';
import { AbstractOAuth2AuthenticationHandler } from './base';

export class OAuth2ClientCredentialHandler
  extends AbstractOAuth2AuthenticationHandler
  implements ClientCredentialsModel
{
  constructor(opts: {
    scope?: string;
    authServiceKey: string;
    injectionGetter: <T>(key: string) => T;
    serviceKey: string;
  }) {
    super({ scope: opts.scope, authServiceKey: opts.authServiceKey, injectionGetter: opts.injectionGetter });
  }

  getUserFromClient(client: Client): Promise<User | Falsey> {
    this.logger.debug('[getUserFromClient] Client: %j', client);
    const service = this.injectionGetter<IAuthService>(this.authServiceKey);

    if (!service?.getUserInformation) {
      throw getError({ message: `${this.authServiceKey} has no 'getUserInformation' method!` });
    }

    const userInformation = service?.getUserInformation?.(client);
    return Promise.resolve(userInformation);
  }
}