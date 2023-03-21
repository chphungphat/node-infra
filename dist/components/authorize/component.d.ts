import { BaseComponent } from '@/base/base.component';
import { Binding } from '@loopback/core';
import { BaseApplication } from '@/base/base.application';
export declare class AuthorizeComponent extends BaseComponent {
    protected application: BaseApplication;
    bindings: Binding[];
    constructor(application: BaseApplication);
    defineModels(): void;
    binding(): void;
}