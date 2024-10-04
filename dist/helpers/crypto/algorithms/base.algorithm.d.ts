import { BaseHelper } from '../../../base/base.helper';
import { ICryptoAlgorithm } from '../common';
export declare abstract class AbstractCryptoAlgorithm<AL extends string, IO> extends BaseHelper implements ICryptoAlgorithm<AL, IO> {
    algorithm: AL;
    abstract encrypt(message: string, secret: string, opts?: IO | undefined): string;
    abstract decrypt(message: string, secret: string, opts?: IO | undefined): string;
}
export declare abstract class BaseCryptoAlgorithm<AL extends string, IO> extends AbstractCryptoAlgorithm<AL, IO> {
    constructor(opts: {
        scope: string;
        algorithm: AL;
    });
    validateAlgorithmName(opts: {
        algorithm: AL;
    }): void;
    normalizeSecretKey(opts: {
        secret: string;
        length: number;
        padEnd?: string;
    }): string;
    getAlgorithmKeySize(): number;
}
