import {controller, httpGet, interfaces, response} from "inversify-express-utils";
import {inject} from "inversify";
import {ServiceTypes} from "@gallery/service/service";
import {PictureService} from "@gallery/service/picture/picture-service";
import express from "express";

@controller("/picture")
class PictureController implements interfaces.Controller {

    constructor(@inject(ServiceTypes.Picture) private pictureService: PictureService) {}

    @httpGet("/")
    public async index(@response() response: express.Response) {
         return response.status(200).send(this.pictureService.index())
    }
}
