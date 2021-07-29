import {Container} from "inversify";
import "reflect-metadata";
import {PictureService} from "./picture/picture-service";
import {PictureServiceImpl} from "./picture/picture-service-impl";
import {AlbumService} from "@gallery/service/album/album-service";
import {AlbumServiceImpl} from "@gallery/service/album/album-service-impl";
import {ServiceTypes} from "@gallery/service/service-type";

const Service = new Container( { defaultScope: "Singleton" } )
Service.bind<AlbumService>(ServiceTypes.Album).to(AlbumServiceImpl)
Service.bind<PictureService>(ServiceTypes.Picture).to(PictureServiceImpl)

export { Service }
