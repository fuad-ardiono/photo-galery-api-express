import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    request,
    requestParam,
    response
} from "inversify-express-utils"
import {inject} from "inversify"
import express from "express"
import {PictureService} from "@gallery/service/picture/picture-service"
import {ServiceTypes} from "@gallery/service/service-type";
import {adminMiddlewareHandler} from "@gallery/middleware/admin-middleware";
import {classToPlain, plainToClass} from "class-transformer";
import {MovePictToNewAlbumRequest, UpdatePictureRequest} from "@gallery/pojo/request/picture/update-picture-request";
import {CreatePictureRequest} from "@gallery/pojo/request/picture/create-picture-request";

@controller("/picture")
export class PictureController implements interfaces.Controller {

    constructor(@inject(ServiceTypes.Picture) private readonly pictureService: PictureService) {
    }

    @httpGet("/")
    public async index(@request() request: express.Request, @response() response: express.Response) {
        let record = await this.pictureService.index(
            Number(request.query?.perPage),
            Number(request.query?.page),
            request.query?.title != '' && request.query?.title != undefined ? String(request.query?.title) : null
        )

        return response.status(200).send(classToPlain(record))
    }

    @httpPost("/", adminMiddlewareHandler)
    public async create(@request() request: express.Request, @response() response: express.Response) {
        let record = await this.pictureService.create(plainToClass(CreatePictureRequest, request.body))

        return response.status(200).send(classToPlain(record))
    }

    @httpPut("/:id", adminMiddlewareHandler)
    public async update(
        @requestParam("id") id: number,
        @request() request: express.Request,
        @response() response: express.Response
    ) {
        let record = await this.pictureService.update(id, plainToClass(UpdatePictureRequest, request.body))

        return response.status(201).send(classToPlain(record))
    }

    @httpPut("/move/:idAlbum", adminMiddlewareHandler)
    public async movePictToNewAlbum(
        @requestParam("idAlbum") idAlbum: number,
        @request() request: express.Request,
        @response() response: express.Response
    ) {
        let requestClass = plainToClass(MovePictToNewAlbumRequest, request.body)

        let record = await this.pictureService.movePhotoToNewAlbum(idAlbum, requestClass.pictureIds)

        return response.status(200).send(classToPlain(record))
    }

    @httpDelete("/:id", adminMiddlewareHandler)
    public async delete(@requestParam("id") id: number, @response() response: express.Response) {
        let record = await this.pictureService.delete(id)

        return response.status(200).send(classToPlain(record))
    }
}
