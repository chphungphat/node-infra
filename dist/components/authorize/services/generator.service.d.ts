import { IController } from '../../../common';
import { Constructor, MetadataMap } from '@loopback/core';
import { IPermissionDecorator } from '../decorators';
import { Permission } from '../models';
import { PermissionRepository } from '../repositories';
export interface IPermission {
    code: string;
    subject: string;
    action: string;
    scope: string;
    name: string;
    parentId: number;
    pType: string;
    details?: IPermissionDecorator;
}
export declare class GeneratePermissionService {
    getMethodsClass(controllerPrototype: object): string[];
    getAllMethodsClass(controllerPrototype: object): string[];
    generateParentPermissions(opts: {
        controller: Constructor<IController>;
        permissionRepository: PermissionRepository;
    }): Promise<void>;
    generatePermissions(opts: {
        methods: string[];
        permissionSubject: string;
        parentId: number;
        allPermissionDecoratorData: MetadataMap<IPermissionDecorator>;
    }): IPermission[];
    generatePermissionBaseInherit(opts: {
        methodsParentsClass: string[];
        methodsChildClass: string[];
        parentPermission: Permission;
        allPermissionDecoratorData: MetadataMap<IPermissionDecorator>;
    }): IPermission[];
    generatePermissionRecords(opts: {
        controller: Constructor<IController>;
        parentPermission: Permission;
        permissionRepository: PermissionRepository;
        allPermissionDecoratorData: MetadataMap<IPermissionDecorator>;
    }): IPermission[];
    updatePermissionByChangeMethodName(permissionSubject: string, allPermissionDecoratorData: MetadataMap<IPermissionDecorator>, permissionRepository: PermissionRepository): Promise<void>;
    startMigration(opts: {
        permissionRepository: PermissionRepository;
        controllers: Array<Constructor<IController>>;
    }): Promise<void>;
    /**
     * Obtain all permission codes for a controller
     *
     * @returns {string[]} List of permission codes
     */
    getPermissionCodes(opts: {
        controllers: Array<Constructor<IController>>;
    }): string[];
    /**
     * Write all permission codes for a list of controllers to a file
     *
     * @param outputPath - Path to write
     *
     * @example
     * const generatePermissionService = new GeneratePermissionService();
     *
     * generatePermissionService.getPermissionCodesAndWriteToFile({
     *    controllers: [XboxController, PSController, NintendoController],
     *    outputPath: './src/migrations/',
     *    fileName: 'permissionCodes',
     *    fileType: 'ts',
     * });
     */
    getPermissionCodesAndWriteToFile(opts: {
        controllers: Array<Constructor<IController>>;
        outputPath?: string;
        fileName?: string;
        fileType?: 'ts' | 'txt';
    }): void;
}
