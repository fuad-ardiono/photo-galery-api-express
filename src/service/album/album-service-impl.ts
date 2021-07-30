import {AlbumService} from "@gallery/service/album/album-service";
import {PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {Album} from "@gallery/entity/album";
import {getCustomRepository} from "typeorm";
import {AlbumRepository} from "@gallery/repository/album-repository";
import {injectable} from "inversify";
import {CreateAlbumRequest} from "@gallery/pojo/request/album/create-album-request";
import {classToPlain, plainToClass} from "class-transformer";

@injectable()
export class AlbumServiceImpl implements AlbumService {
    private albumRepository: AlbumRepository

    constructor() {
        this.albumRepository = getCustomRepository(AlbumRepository)
    }

    async index(perPage: number, page: number, title: string | null): Promise<PaginationResponse<Album[]>> {
        return await this.albumRepository.findByPaginate(perPage, page, title)
    }

    async delete(id: number): Promise<Album> {
        return await this.albumRepository.deleteById(id)
    }

    async create(request: CreateAlbumRequest): Promise<Album> {
        let album: Album = new Album()
        let requestJson = classToPlain(request)
        let albumJson = classToPlain(album)

        return await this.albumRepository.save(plainToClass(Album, Object.assign(albumJson, requestJson)))
    }
}
