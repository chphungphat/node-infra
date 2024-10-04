"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestRemark = exports.getRequestId = exports.getSchemaObject = exports.parseMultipartBody = void 0;
const rest_1 = require("@loopback/rest");
const get_1 = __importDefault(require("lodash/get"));
const multer_1 = __importDefault(require("multer"));
// -------------------------------------------------------------------------
const parseMultipartBody = (opts) => {
    const { storage: cStorage, request, response } = opts;
    const storage = cStorage !== null && cStorage !== void 0 ? cStorage : multer_1.default.memoryStorage();
    const upload = (0, multer_1.default)({ storage });
    return new Promise((resolve, reject) => {
        upload.any()(request, response, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(request.files);
        });
    });
};
exports.parseMultipartBody = parseMultipartBody;
// -------------------------------------------------------------------------
const getSchemaObject = (ctor) => {
    return ctor ? (0, rest_1.getModelSchemaRef)(ctor).definitions[ctor.name] : {};
};
exports.getSchemaObject = getSchemaObject;
// -------------------------------------------------------------------------
const getRequestId = (opts) => {
    return (0, get_1.default)(opts.request, 'requestId');
};
exports.getRequestId = getRequestId;
// -------------------------------------------------------------------------
const getRequestRemark = (opts) => {
    return (0, get_1.default)(opts.request, 'requestedRemark');
};
exports.getRequestRemark = getRequestRemark;
//# sourceMappingURL=request.utility.js.map