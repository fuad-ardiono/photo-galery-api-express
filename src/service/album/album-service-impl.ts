import {AlbumService} from "@gallery/service/album/album-service";
import {PaginationResponse} from "@gallery/pojo/pagination";
import {Album} from "@gallery/entity/album";
import {getCustomRepository} from "typeorm";
import {AlbumRepository} from "@gallery/repository/album-repository";
import {injectable} from "inversify";

@injectable()
export class AlbumServiceImpl implements AlbumService {
    async index(perPage: number, page: number, title: string | null): Promise<PaginationResponse<Album[]>> {
        const photoRepository = await getCustomRepository(AlbumRepository)

        return await photoRepository.findByPaginate(perPage, page, title)
    }
}
