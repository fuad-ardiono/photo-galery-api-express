import {controller, httpGet, interfaces, response, request} from "inversify-express-utils"
import {inject} from "inversify"
import express from "express"
import {PictureService} from "@gallery/service/picture/picture-service"
import {ServiceTypes} from "@gallery/service/service-type";

@controller("/picture")
export class PictureController implements interfaces.Controller {

    constructor(@inject(ServiceTypes.Picture) private readonly pictureService: PictureService) {}

    @httpGet("/")
    public async index(@request() request: express.Request, @response() response: express.Response) {
        let record = await this.pictureService.index(
            Number(request.query?.perPage),
            Number(request.query?.page),
            request.query?.title != '' && request.query?.title != undefined ? String(request.query?.title) : null
        )

        return response.status(200).send(record)
    }
}
