import {controller, httpPost, interfaces, request, requestParam, response} from "inversify-express-utils";
import {inject} from "inversify";
import {ServiceTypes} from "@gallery/service/service-type";
import {StorageService} from "@gallery/service/storage/storage-service";
import express from "express";
import {classToPlain, plainToClass} from "class-transformer";
import {UploadFileRequest} from "@gallery/pojo/request/storage/upload-file-request";
import {adminMiddlewareHandler} from "@gallery/middleware/admin-middleware";

@controller("/storage")
export class StorageController implements interfaces.Controller {
    constructor(@inject(ServiceTypes.Storage) private readonly storageService: StorageService) {}

    @httpPost("/upload", adminMiddlewareHandler)
    public async uploadFile(@request() request: express.Request, @response() response: express.Response) {
        let requestClass = plainToClass(UploadFileRequest, request.body)

        let uploadFile = await this.storageService.uploadFile(requestClass.base64, requestClass.fileName)

        return response.status(200).send(classToPlain(uploadFile))
    }
}
