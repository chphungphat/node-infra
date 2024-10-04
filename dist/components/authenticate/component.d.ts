import { BaseApplication } from '../../base/applications';
import { BaseComponent } from '../../base/base.component';
import { Binding } from '@loopback/core';
export declare class AuthenticateComponent extends BaseComponent {
    protected application: BaseApplication;
    bindings: Binding[];
    constructor(application: BaseApplication);
    defineMiddlewares(): void;
    defineServices(): void;
    defineControllers(): void;
    defineOAuth2(): void;
    registerComponent(): void;
    binding(): void;
}
