import {PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {Album} from "@gallery/entity/album";
import {CreateAlbumRequest} from "@gallery/pojo/request/album/create-album-request";

export interface AlbumService {
    index(perPage: number, page: number, title: string|null): Promise<PaginationResponse<Album[]>>

    delete(id: number): Promise<Album>

    create(request: CreateAlbumRequest): Promise<Album>
}
