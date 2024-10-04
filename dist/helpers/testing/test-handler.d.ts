import { ValueOrPromise } from '../../common';
import { ITestCaseHandler, ITestCaseInput, ITestContext, TTestCaseDecision } from './types';
import { ApplicationLogger } from '../logger';
export interface ITestCaseHandlerOptions<R extends object, I extends ITestCaseInput = {}> {
    scope?: string;
    context: ITestContext<R>;
    args?: I | null;
    argResolver?: (...args: any[]) => I | null;
    validator?: (opts: any) => ValueOrPromise<TTestCaseDecision>;
}
export declare abstract class BaseTestCaseHandler<R extends object = {}, I extends ITestCaseInput = {}> implements ITestCaseHandler<R, I> {
    protected logger: ApplicationLogger;
    context: ITestContext<R>;
    args: I | null;
    validator?: (opts: any) => ValueOrPromise<TTestCaseDecision>;
    constructor(opts: ITestCaseHandlerOptions<R, I>);
    getArguments(): I | null;
    abstract execute(): ValueOrPromise<any>;
    abstract getValidator(): ((opts: Awaited<ReturnType<typeof this.execute>>) => ValueOrPromise<TTestCaseDecision>) | null;
    abstract validate(opts: any): ValueOrPromise<TTestCaseDecision>;
}
export declare abstract class TestCaseHandler<R extends object = {}, I extends ITestCaseInput = {}> extends BaseTestCaseHandler<R, I> {
    constructor(opts: ITestCaseHandlerOptions<R, I>);
    _execute(): Promise<void>;
    validate(opts: any): ValueOrPromise<TTestCaseDecision>;
}
