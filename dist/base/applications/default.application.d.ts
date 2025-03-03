import { IEnvironmentValidationResult } from '../../common';
import { ApplicationConfig, Constructor } from '@loopback/core';
import { SequenceHandler } from '@loopback/rest';
import { BaseApplication } from './base.application';
export declare abstract class DefaultRestApplication extends BaseApplication {
    protected applicationRoles: string[];
    constructor(opts: {
        serverOptions: ApplicationConfig;
        sequence?: Constructor<SequenceHandler>;
    });
    getApplicationRoles(): string[];
    validateEnv(): IEnvironmentValidationResult;
    declareModels(): Set<string>;
    configureMigration(): void;
    preConfigure(): void;
}
