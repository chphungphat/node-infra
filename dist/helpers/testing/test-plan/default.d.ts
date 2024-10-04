import { ITestPlanOptions } from '../types';
import { BaseTestPlan } from './base';
export declare class TestPlan<R extends object> extends BaseTestPlan<R> {
    static newInstance<R extends object>(opts: ITestPlanOptions<R>): TestPlan<R>;
}
