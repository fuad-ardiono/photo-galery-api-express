import {PaginationResponse} from "@gallery/pojo/pagination";
import {Album} from "@gallery/entity/album";

export interface AlbumService {
    index(perPage: number, page: number, title: string|null): Promise<PaginationResponse<Album[]>>
}
