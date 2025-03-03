import { ValueOrPromise } from '../common';
type TTask<T> = () => Promise<T>;
/**
 *  Execute all tasks with limit number of asyncronous tasks.
 *  Whenever 1 task's resolved next task will be executed.
 *
 *  @example
 *  With 20 tasks need to execute with limit is 5 tasks asyncronous
 *  ```
 *  const tasks = <Array of 20 functions which return promises>
 *  await executePromiseWithLimit({
 *    tasks,
 *    limit: 5,
      onTaskDone: (opts: { result: any }) => {
        // Do something on task done
      },
 *  })
 *  ```
 */
export declare const executePromiseWithLimit: <T>(opts: {
    tasks: Array<TTask<T>>;
    limit: number;
    onTaskDone?: <R>(opts: {
        result: R;
    }) => ValueOrPromise<void>;
}) => Promise<Awaited<T>[]>;
export {};
