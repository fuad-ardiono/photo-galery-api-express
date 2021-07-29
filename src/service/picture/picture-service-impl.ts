import {injectable} from "inversify";
import {PictureService} from "./picture-service";
import {PhotoRepository} from "@gallery/repository/photo-repository";
import {PaginationResponse} from "@gallery/pojo/pagination";
import {Photo} from "@gallery/entity/photo";
import {getCustomRepository} from "typeorm";

@injectable()
export class PictureServiceImpl implements PictureService {
    async index(perPage: number, page: number, title: string|null): Promise<PaginationResponse<Photo[]>> {
        const photoRepository = await getCustomRepository(PhotoRepository)

        return await photoRepository.findByPaginate(perPage, page, title)
    }
}
