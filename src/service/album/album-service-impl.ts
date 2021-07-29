import {AlbumService} from "@gallery/service/album/album-service";
import {PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {Album} from "@gallery/entity/album";
import {getCustomRepository} from "typeorm";
import {AlbumRepository} from "@gallery/repository/album-repository";
import {injectable} from "inversify";

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
}
