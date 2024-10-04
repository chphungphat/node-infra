import C from 'crypto';
export declare const hash: (text: string, options: {
    algorithm: "SHA256" | "MD5";
    secret?: string;
    outputType: C.BinaryToTextEncoding;
}) => string;
