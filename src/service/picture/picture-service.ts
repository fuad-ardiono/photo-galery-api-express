import {PaginationResponse} from "@gallery/pojo/pagination";
import {Photo} from "@gallery/entity/photo";

export interface PictureService {
    index(perPage: number, page: number, title: string|null): Promise<PaginationResponse<Photo[]>>
}
