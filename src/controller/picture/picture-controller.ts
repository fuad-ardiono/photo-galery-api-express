import {controller, httpGet, interfaces, response, request, httpPut, requestParam} from "inversify-express-utils"
import {inject} from "inversify"
import express from "express"
import {PictureService} from "@gallery/service/picture/picture-service"
import {ServiceTypes} from "@gallery/service/service-type";
import {adminMiddlewareHandler} from "@gallery/middleware/admin-middleware";
import {plainToClass} from "class-transformer";
import {UpdatePictureRequest} from "@gallery/pojo/request/picture/update-picture-request";
import {DataNotFoundException} from "@gallery/exception/datanotfound-exception";

@controller("/picture")
export class PictureController implements interfaces.Controller {

    constructor(@inject(ServiceTypes.Picture) private readonly pictureService: PictureService) {
    }

    @httpGet("/")
    public async index(@request() request: express.Request, @response() response: express.Response) {
        throw new DataNotFoundException("Test exception")
        let record = await this.pictureService.index(
            Number(request.query?.perPage),
            Number(request.query?.page),
            request.query?.title != '' && request.query?.title != undefined ? String(request.query?.title) : null
        )

        return response.status(200).send(record)
    }

    @httpPut("/:id", adminMiddlewareHandler)
    public async update(
        @requestParam("id") id: number,
        @request() request: express.Request,
        @response() response: express.Response
    ) {
        let record = await this.pictureService.update(id, plainToClass(UpdatePictureRequest, request.body))

        return response.status(200).send(record)
    }
}
