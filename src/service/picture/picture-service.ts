import {PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {Photo} from "@gallery/entity/photo";
import {UpdatePictureRequest} from "@gallery/pojo/request/picture/update-picture-request";
import {CreatePictureRequest} from "@gallery/pojo/request/picture/create-picture-request";

export interface PictureService {
    index(perPage: number, page: number, title: string|null): Promise<PaginationResponse<Photo[]>>

    update(id: number, request: UpdatePictureRequest): Promise<Photo>

    delete(id: number): Promise<Photo>

    movePhotoToNewAlbum(idAlbum: number, idPhotos: number[]): Promise<Photo[]>

    create(request: CreatePictureRequest): Promise<Photo>
}
