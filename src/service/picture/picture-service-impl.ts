import {inject, injectable} from "inversify";
import {PictureService} from "./picture-service";
import {PhotoRepository} from "@gallery/repository/photo-repository";
import {PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {Photo} from "@gallery/entity/photo";
import {getCustomRepository} from "typeorm";
import {UpdatePictureRequest} from "@gallery/pojo/request/picture/update-picture-request";
import {AlbumRepository} from "@gallery/repository/album-repository";

@injectable()
export class PictureServiceImpl implements PictureService {
    private photoRepository: PhotoRepository
    private albumRepository: AlbumRepository

    constructor() {
        this.photoRepository = getCustomRepository(PhotoRepository)
        this.albumRepository = getCustomRepository(AlbumRepository)
    }

    async index(perPage: number, page: number, title: string|null): Promise<PaginationResponse<Photo[]>> {
        return await this.photoRepository.findByPaginate(perPage, page, title)
    }

    async update(id: number, request: UpdatePictureRequest): Promise<Photo> {
        return await this.photoRepository.updateById(id, request)
    }

    async delete(id: number): Promise<Photo> {
        return await this.photoRepository.deleteById(id)
    }

    async movePhotoToNewAlbum(idAlbum: number, idPhotos: number[]): Promise<Photo[]> {
        let photosRecord = await this.photoRepository.findByIdArray(idPhotos)
        let albumRecord = await this.albumRepository.findOneById(idAlbum)

        const updatePhotos: Photo[] = photosRecord.map((obj) => ({
            ...obj,
            album: albumRecord
        }))

        return await this.photoRepository.save(updatePhotos)
    }
}
