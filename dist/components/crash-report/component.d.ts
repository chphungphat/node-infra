import { BaseApplication } from '../../base/applications';
import { BaseComponent } from '../../base/base.component';
import { Getter, LifeCycleObserver } from '@loopback/core';
import { TGetCrashReportProviderFn } from './providers';
export declare class CrashReportComponent extends BaseComponent implements LifeCycleObserver {
    protected application: BaseApplication;
    protected crashReportProviderGetter: Getter<TGetCrashReportProviderFn>;
    constructor(application: BaseApplication, crashReportProviderGetter: Getter<TGetCrashReportProviderFn>);
    defineProviders(): void;
    defineServices(): void;
    binding(): Promise<void>;
    start(): void;
}
