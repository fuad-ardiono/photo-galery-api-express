import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    interfaces,
    request,
    requestParam,
    response
} from "inversify-express-utils";
import {AlbumService} from "@gallery/service/album/album-service";
import express from "express";
import {inject} from "inversify";
import {ServiceTypes} from "@gallery/service/service-type";
import {classToPlain, plainToClass} from "class-transformer";
import {CreateAlbumRequest} from "@gallery/pojo/request/album/create-album-request";
import {adminMiddlewareHandler} from "@gallery/middleware/admin-middleware";

@controller("/album")
export class AlbumController implements interfaces.Controller {
    constructor(@inject(ServiceTypes.Album) private readonly albumService: AlbumService) {}

    @httpGet("/")
    public async index(@request() request: express.Request, @response() response: express.Response) {
        let record = await this.albumService.index(
            Number(request.query?.perPage),
            Number(request.query?.page),
            request.query?.title != '' && request.query?.title != undefined ? String(request.query?.title) : null
        )

        return response.status(200).send(classToPlain(record))
    }

    @httpPost("/", adminMiddlewareHandler)
    public async create(@request() request: express.Request, @response() response: express.Response) {
        const record = await this.albumService.create(plainToClass(CreateAlbumRequest, request.body))

        return response.status(201).send(classToPlain(record))
    }

    @httpDelete("/:id", adminMiddlewareHandler)
    public async delete(@requestParam("id") id: number, @response() response: express.Response) {
        const record = await this.albumService.delete(id)

        return response.status(200).send(classToPlain(record))
    }
}

