import {inject, injectable} from "inversify";
import {PictureService} from "./picture-service";
import {PhotoRepository} from "@gallery/repository/photo-repository";
import {PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {Photo} from "@gallery/entity/photo";
import {getCustomRepository} from "typeorm";
import {UpdatePictureRequest} from "@gallery/pojo/request/picture/update-picture-request";

@injectable()
export class PictureServiceImpl implements PictureService {
    private photoRepository: PhotoRepository

    constructor() {
        this.photoRepository = getCustomRepository(PhotoRepository)
    }

    async index(perPage: number, page: number, title: string|null): Promise<PaginationResponse<Photo[]>> {
        return await this.photoRepository.findByPaginate(perPage, page, title)
    }

    async update(id: number, request: UpdatePictureRequest): Promise<Photo> {
        return await this.photoRepository.updateById(id, request)
    }
}
