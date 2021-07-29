import {Container} from "inversify";
import "reflect-metadata";
import {PictureService} from "./picture/picture-service";
import {PictureServiceImpl} from "./picture/picture-service-impl";

const ServiceTypes = {
    Picture: Symbol.for("Picture"),
}

const Service = new Container()
Service.bind<PictureService>(ServiceTypes.Picture).to(PictureServiceImpl)

export { ServiceTypes, Service }
