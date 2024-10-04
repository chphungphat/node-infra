import { AnyObject } from '@loopback/repository';
import { TestCaseHandler } from './test-handler';
import { ITestCase } from './types';
export interface ITestCaseOptions<R extends object = {}, I extends object = {}> {
    code: string;
    name?: string;
    description: string;
    expectation?: string;
    handler: TestCaseHandler<R, I>;
}
export declare class TestCase<R extends object = {}, I extends object = {}> implements ITestCase<R, I> {
    code: string;
    name?: string;
    description: string;
    expectation?: string;
    handler: TestCaseHandler<R, I>;
    constructor(opts: ITestCaseOptions<R, I>);
    static withOptions<R extends object = AnyObject, I extends object = {}>(opts: ITestCaseOptions<R, I>): TestCase<R, I>;
    run(): Promise<void>;
}
