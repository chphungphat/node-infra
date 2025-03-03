import C from 'crypto';
import { BaseCryptoAlgorithm } from './base.algorithm';
interface IO {
    inputEncoding?: {
        key: C.Encoding;
        message: C.Encoding;
    };
    outputEncoding?: C.Encoding;
    doThrow?: boolean;
}
export type RSAAlgorithmType = 'rsa';
export declare class RSA extends BaseCryptoAlgorithm<RSAAlgorithmType, IO> {
    constructor(opts: {
        algorithm: RSAAlgorithmType;
    });
    static withAlgorithm(): RSA;
    generateDERKeyPair(opts?: {
        modulus: number;
    }): {
        publicKey: Buffer<ArrayBufferLike>;
        privateKey: Buffer<ArrayBufferLike>;
    };
    encrypt(message: string, pubKey: string, opts?: IO): string;
    decrypt(message: string, privKey: string, opts?: IO): string;
}
export {};
