import { ApplicationLogger, LoggerFactory } from '@/helpers';
import _OAuth2Server from '@node-oauth/oauth2-server';

export class OAuth2Handler extends _OAuth2Server {
  // private identifier: string;
  private logger: ApplicationLogger;

  constructor(opts: { scope?: string; serverOptions: _OAuth2Server.ServerOptions }) {
    const { scope, serverOptions } = opts;
    super(serverOptions);

    this.logger = LoggerFactory.getLogger([scope ?? OAuth2Handler.name]);
    this.configure();
  }

  configure() {
    this.logger.info('[configure] START | Configuring application OAuth2 server...!');
    this.logger.info('[configure] DONE | Configured application OAuth2 server!');
  }
}
