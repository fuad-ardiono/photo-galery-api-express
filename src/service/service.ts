import {Container} from "inversify";
import "reflect-metadata";
import {PictureService} from "./picture/picture-service";
import {PictureServiceImpl} from "./picture/picture-service-impl";
import {AlbumService} from "@gallery/service/album/album-service";
import {AlbumServiceImpl} from "@gallery/service/album/album-service-impl";

const ServiceTypes = {
    Picture: Symbol.for("Picture"),
    Album: Symbol.for("Album")
}

const Service = new Container()
Service.bind<PictureService>(ServiceTypes.Picture).to(PictureServiceImpl)
Service.bind<AlbumService>(ServiceTypes.Album).to(AlbumServiceImpl)

export { ServiceTypes, Service }
