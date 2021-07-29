import {PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {Photo} from "@gallery/entity/photo";

export interface PictureService {
    index(perPage: number, page: number, title: string|null): Promise<PaginationResponse<Photo[]>>
}
