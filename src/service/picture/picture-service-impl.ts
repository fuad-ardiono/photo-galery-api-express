import {injectable} from "inversify";
import {PictureService} from "./picture-service";
import {PhotoRepository} from "@gallery/repository/photo-repository";
import {PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {Photo} from "@gallery/entity/photo";
import {getCustomRepository} from "typeorm";
import {UpdatePictureRequest} from "@gallery/pojo/request/picture/update-picture-request";
import {AlbumRepository} from "@gallery/repository/album-repository";
import {CreatePictureRequest} from "@gallery/pojo/request/picture/create-picture-request";
import {classToPlain, plainToClass} from "class-transformer";
import {DataNotFoundException} from "@gallery/exception/datanotfound-exception";

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
        console.log(idAlbum)
        console.log(idPhotos)
        try {
            let photosRecord = await this.photoRepository.findByIdArray(idPhotos)
            let albumRecord = await this.albumRepository.findOneById(idAlbum)

            const updatePhotos: Photo[] = photosRecord.map((obj) => ({
                ...obj,
                album: albumRecord
            }))

            return await this.photoRepository.save(updatePhotos)
        } catch (e) {
            console.log(e)
            throw new DataNotFoundException("err")
        }
    }

    async create(request: CreatePictureRequest): Promise<Photo> {
        let photo: Photo = new Photo()
        let photoJson = classToPlain(photo)
        let requestJson = classToPlain(request)

        let albumRecord = await this.albumRepository.findOneById(request.albumId)
        let payload = plainToClass(Photo, Object.assign(photoJson, requestJson))
        payload.album = albumRecord

        return await this.photoRepository.save(payload)
    }
}
