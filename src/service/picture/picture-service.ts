import {PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {Photo} from "@gallery/entity/photo";
import {UpdatePictureRequest} from "@gallery/pojo/request/picture/update-picture-request";

export interface PictureService {
    index(perPage: number, page: number, title: string|null): Promise<PaginationResponse<Photo[]>>

    update(id: number, request: UpdatePictureRequest): Promise<Photo>
}
