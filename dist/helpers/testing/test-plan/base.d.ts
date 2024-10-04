import { ITestCase, ITestHooks, ITestPlan, ITestPlanOptions } from '../types';
import { DIContainerHelper } from './../../storage';
export declare abstract class BaseTestPlan<R extends object> implements ITestPlan<R> {
    private logger;
    private registry;
    private hooks;
    private testCases;
    scope: string;
    constructor(opts: ITestPlanOptions<R>);
    withTestCases(opts: {
        testCases: Array<ITestCase<R>>;
    }): this;
    getTestCases(): ITestCase<R, {}>[];
    getHooks(): ITestHooks<R>;
    getHook(opts: {
        key: keyof ITestHooks<R>;
    }): import("../types").TTestHook<R> | null;
    getRegistry(): DIContainerHelper<R>;
    getContext(): this;
    bind<T>(opts: {
        key: string;
        value: T;
    }): void;
    getSync<T>(opts: {
        key: keyof R;
    }): T;
    execute(): void;
}
