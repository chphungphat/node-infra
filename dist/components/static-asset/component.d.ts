import { Binding } from '@loopback/core';
import { BaseComponent } from '../../base/base.component';
import { BaseApplication } from '../../base/applications';
export declare class StaticAssetComponent extends BaseComponent {
    protected application: BaseApplication;
    bindings: Binding[];
    constructor(application: BaseApplication);
    defineControllers(opts: {
        useMinioAsset: boolean;
        useStaticResource: boolean;
    }): void;
    binding(): void;
}
