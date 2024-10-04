"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var StaticAssetController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticAssetController = void 0;
const applications_1 = require("../../../base/applications");
const helpers_1 = require("../../../helpers");
const utilities_1 = require("../../../utilities");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const multer_1 = __importDefault(require("multer"));
const common_1 = require("../common");
let StaticAssetController = StaticAssetController_1 = class StaticAssetController {
    constructor(application, response) {
        this.application = application;
        this.response = response;
        this.logger = helpers_1.LoggerFactory.getLogger([StaticAssetController_1.name]);
        this.temporaryStorage = multer_1.default.memoryStorage();
    }
    createBucket(bucketName) {
        const minioInstance = this.application.getSync(common_1.ResourceAssetKeys.MINIO_INSTANCE);
        return minioInstance.createBucket({ name: bucketName });
    }
    removeBucket(bucketName) {
        const minioInstance = this.application.getSync(common_1.ResourceAssetKeys.MINIO_INSTANCE);
        return minioInstance.removeBucket({ name: bucketName });
    }
    getBucket(bucketName) {
        const minioInstance = this.application.getSync(common_1.ResourceAssetKeys.MINIO_INSTANCE);
        return minioInstance.getBucket({ name: bucketName });
    }
    getBuckets() {
        const minioInstance = this.application.getSync(common_1.ResourceAssetKeys.MINIO_INSTANCE);
        return minioInstance.getBuckets();
    }
    uploadObject(request, bucketName, folderPath) {
        const minioInstance = this.application.getSync(common_1.ResourceAssetKeys.MINIO_INSTANCE);
        return new Promise((resolve, reject) => {
            (0, multer_1.default)({ storage: this.temporaryStorage }).array('files')(request, this.response, error => {
                if (error) {
                    this.logger.error('[uploadObject] Fail to upload files! Error: %s', error);
                    reject(error);
                }
                if (folderPath) {
                    // Removes leading and trailing slashes
                    folderPath = folderPath.replace(/^\/|\/$/g, '');
                }
                const files = request.files;
                const modifiedFiles = files.map(file => (Object.assign(Object.assign({}, file), { originalname: folderPath ? `${folderPath}/${file.originalname}` : file.originalname })));
                minioInstance
                    .upload({ bucket: bucketName, files: modifiedFiles })
                    .then(rs => {
                    resolve(rs);
                })
                    .catch(reject);
            });
        });
    }
    downloadObject(bucketName, objectName) {
        const minioInstance = this.application.getSync(common_1.ResourceAssetKeys.MINIO_INSTANCE);
        return new Promise(() => {
            minioInstance.getStat({ bucket: bucketName, name: objectName }).then(fileStat => {
                const { size, metaData } = fileStat;
                this.response.set(Object.assign(Object.assign({}, metaData), { 'Content-Length': size, 'Content-Disposition': `attachment; filename=${objectName}` }));
                minioInstance
                    .getFile({
                    bucket: bucketName,
                    name: objectName,
                })
                    .then(stream => {
                    stream.pipe(this.response);
                    stream.on('end', () => {
                        this.response.end();
                    });
                })
                    .catch(error => {
                    this.logger.error('[downloadObject] Error: %s', error);
                    throw (0, utilities_1.getError)({
                        message: `[downloadObject] Cannot download ${objectName}! Error while streaming data to client!`,
                        statusCode: 500,
                    });
                });
            });
        });
    }
    getStaticObject(bucketName, objectName) {
        const minioInstance = this.application.getSync(common_1.ResourceAssetKeys.MINIO_INSTANCE);
        return new Promise(() => {
            minioInstance.getStat({ bucket: bucketName, name: objectName }).then(fileStat => {
                const { size, metaData } = fileStat;
                this.response.writeHead(206, Object.assign(Object.assign({}, metaData), { 'Content-Type': 'application/octet-stream', 'Content-Length': size }));
                minioInstance
                    .getFile({
                    bucket: bucketName,
                    name: objectName,
                })
                    .then(stream => {
                    stream.pipe(this.response);
                })
                    .catch(error => {
                    this.logger.error('[getStaticObject] Error: %s', error);
                    throw (0, utilities_1.getError)({
                        message: `[getStaticObject] Cannot stream ${objectName}! Error while streaming data to client!`,
                        statusCode: 500,
                    });
                });
            });
        });
    }
    /**
     * This method fetches the whole file from minio and streams it to the client.
     * It's meant to be used for using file caching on browser.
     * For other use cases, use `getStaticObject` instead.
     *
     * NOTE: By the time this method was written, Google Chrome cannot cache content
     * if the response status code is 206 (Partial Content). So, we use 200 instead.
     */
    fetchWholeFile(bucketName, objectName, cacheTime) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            var _d;
            const minioInstance = this.application.getSync(common_1.ResourceAssetKeys.MINIO_INSTANCE);
            try {
                const fileStat = yield minioInstance.getStat({
                    bucket: bucketName,
                    name: objectName,
                });
                const { size, metaData, lastModified } = fileStat;
                const fileStream = yield minioInstance.getFile({
                    bucket: bucketName,
                    name: objectName,
                });
                const buffers = [];
                try {
                    for (var _e = true, fileStream_1 = __asyncValues(fileStream), fileStream_1_1; fileStream_1_1 = yield fileStream_1.next(), _a = fileStream_1_1.done, !_a; _e = true) {
                        _c = fileStream_1_1.value;
                        _e = false;
                        const buffer = _c;
                        buffers.push(buffer);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_e && !_a && (_b = fileStream_1.return)) yield _b.call(fileStream_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                const file = Buffer.concat(buffers);
                this.response.writeHead(200, Object.assign(Object.assign({}, metaData), { 'Content-Length': size, 'Content-Type': (_d = metaData['content-type']) !== null && _d !== void 0 ? _d : metaData['mimetype'], 'Cache-Control': `private, max-age=${cacheTime !== null && cacheTime !== void 0 ? cacheTime : 60 * 60}`, 'Last-Modified': lastModified.toUTCString() }));
                this.response.end(file);
            }
            catch (error) {
                this.logger.error('[getWholeFile] Error %o', error);
                throw (0, utilities_1.getError)({
                    statusCode: 500,
                    message: 'Error while fetching file',
                });
            }
        });
    }
    deleteObjects(bucketName, payload, folderPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { objectNames } = payload;
            const minioInstance = this.application.getSync(common_1.ResourceAssetKeys.MINIO_INSTANCE);
            let deletingObjects = objectNames;
            if (folderPath) {
                folderPath = folderPath.replace(/^\/|\/$/g, '');
                deletingObjects = objectNames.map(objectName => `${folderPath}/${objectName}`);
            }
            try {
                yield minioInstance.client.removeObjects(bucketName, deletingObjects);
                this.response.status(200).send({
                    message: 'Object deleted successfully',
                });
            }
            catch (error) {
                this.logger.error('[deleteObject] Error %o', error);
                throw (0, utilities_1.getError)({
                    statusCode: 500,
                    message: 'Error while deleting object',
                });
            }
        });
    }
};
exports.StaticAssetController = StaticAssetController;
__decorate([
    (0, rest_1.post)('/buckets/{bucket_name}', {
        responses: {
            '200': {
                description: 'Create minio bucket with name',
                content: { 'application/json': {} },
            },
        },
    }),
    __param(0, rest_1.param.path.string('bucket_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaticAssetController.prototype, "createBucket", null);
__decorate([
    (0, rest_1.del)('/buckets/{bucket_name}', {
        responses: {
            '200': {
                description: 'Delete minio bucket by name',
                content: { 'application/json': {} },
            },
        },
    }),
    __param(0, rest_1.param.path.string('bucket_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaticAssetController.prototype, "removeBucket", null);
__decorate([
    (0, rest_1.get)('/buckets/{bucket_name}', {
        responses: {
            '200': {
                description: 'Get minio bucket by name',
                content: { 'application/json': {} },
            },
        },
    }),
    __param(0, rest_1.param.path.string('bucket_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaticAssetController.prototype, "getBucket", null);
__decorate([
    (0, rest_1.get)('/buckets', {
        responses: {
            '200': {
                description: 'Get minio bucket by name',
                content: { 'application/json': {} },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaticAssetController.prototype, "getBuckets", null);
__decorate([
    (0, rest_1.post)('/buckets/{bucket_name}/upload', {
        responses: {
            '200': {
                description: 'Upload files to bucket',
                content: { 'application/json': {} },
            },
        },
    }),
    __param(0, (0, rest_1.requestBody)({
        description: 'Upload files to minio',
        required: true,
        content: {
            'multipart/form-data': {
                'x-parser': 'stream',
                schema: {
                    type: 'object',
                    properties: {
                        files: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'binary',
                            },
                        },
                    },
                },
            },
        },
    })),
    __param(1, rest_1.param.path.string('bucket_name')),
    __param(2, rest_1.param.query.string('folder_path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], StaticAssetController.prototype, "uploadObject", null);
__decorate([
    (0, rest_1.get)('/{bucket_name}/{object_name}/download'),
    __param(0, rest_1.param.path.string('bucket_name')),
    __param(1, rest_1.param.path.string('object_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StaticAssetController.prototype, "downloadObject", null);
__decorate([
    (0, rest_1.get)('/{bucket_name}/{object_name}'),
    __param(0, rest_1.param.path.string('bucket_name')),
    __param(1, rest_1.param.path.string('object_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StaticAssetController.prototype, "getStaticObject", null);
__decorate([
    (0, rest_1.get)('/{bucket_name}/{object_name}/file'),
    __param(0, rest_1.param.path.string('bucket_name')),
    __param(1, rest_1.param.path.string('object_name')),
    __param(2, rest_1.param.query.number('cache_time', { required: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], StaticAssetController.prototype, "fetchWholeFile", null);
__decorate([
    (0, rest_1.del)('/{bucket_name}/', {
        description: 'Delete multiple objects from bucket',
        responses: {
            '200': {
                description: 'Delete object',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.string('bucket_name', { required: true })),
    __param(1, (0, rest_1.requestBody)({
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        objectNames: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
    })),
    __param(2, rest_1.param.query.string('folder_path', { required: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], StaticAssetController.prototype, "deleteObjects", null);
exports.StaticAssetController = StaticAssetController = StaticAssetController_1 = __decorate([
    (0, rest_1.api)({ basePath: '/static-assets' }),
    __param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    __param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    __metadata("design:paramtypes", [applications_1.BaseApplication, Object])
], StaticAssetController);
//# sourceMappingURL=asset.controller.js.map