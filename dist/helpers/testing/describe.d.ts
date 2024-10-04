import { ApplicationLogger } from '../logger';
import { ITestPlan } from './types';
export declare class TestDescribe<R extends object> {
    testPlan: ITestPlan<R>;
    logger: ApplicationLogger;
    constructor(opts: {
        testPlan: ITestPlan<R>;
    });
    static withTestPlan<R extends object>(opts: {
        testPlan: ITestPlan<R>;
    }): TestDescribe<R>;
    run(): void;
}
export declare class MochaTestDescribe<R extends object> extends TestDescribe<R> {
}
