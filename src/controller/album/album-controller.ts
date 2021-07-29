import {controller, httpGet, interfaces, request, response} from "inversify-express-utils";
import {AlbumService} from "@gallery/service/album/album-service";
import express from "express";
import {inject} from "inversify";
import {ServiceTypes} from "@gallery/service/service-type";

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

        return response.status(200).send(record)
    }
}

