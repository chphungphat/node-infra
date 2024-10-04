import C from 'crypto';
import { BaseCryptoAlgorithm } from './base.algorithm';
interface IO {
    iv?: Buffer;
    inputEncoding?: C.Encoding;
    outputEncoding?: C.Encoding;
    doThrow?: boolean;
}
export type AESAlgorithmType = 'aes-256-cbc' | 'aes-256-gcm';
export declare class AES extends BaseCryptoAlgorithm<AESAlgorithmType, IO> {
    constructor(opts: {
        algorithm: AESAlgorithmType;
    });
    static withAlgorithm(algorithm: AESAlgorithmType): AES;
    encrypt(message: string, secret: string, opts?: IO): string;
    encryptFile(absolutePath: string, secret: string): string;
    decrypt(message: string, secret: string, opts?: IO): string;
    decryptFile(absolutePath: string, secret: string): string;
}
export {};
