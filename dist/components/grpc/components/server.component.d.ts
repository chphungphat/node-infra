import { BaseApplication } from '../../../base/applications';
import { BaseComponent } from '../../../base/base.component';
import { Binding } from '@loopback/core';
export declare class GrpcServerComponent extends BaseComponent {
    protected application: BaseApplication;
    bindings: Binding[];
    constructor(application: BaseApplication);
    defineServer(): void;
    binding(): void;
}
