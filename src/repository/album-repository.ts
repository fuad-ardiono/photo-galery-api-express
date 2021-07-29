import {EntityRepository, IsNull, Like, Not, Repository} from "typeorm";
import {Album} from "@gallery/entity/album";
import {MetaPagination, PaginationResponse} from "@gallery/pojo/pagination";

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album> {
    async findByPaginate(perPage: number, page: number, title: string|null) {
        const [result, total] = await this.findAndCount({
            order: {
                createdAt: 'DESC'
            },
            where: {
                deletedAt: IsNull(),
                title: title ? Like(`%${title}%`) : Not(Like(""))
            },
            take: perPage,
            skip: page === 1 ? 0 : ((perPage * page) - perPage)
        })

        const paginationMeta: MetaPagination = {
            total: Number(total),
            per_page: Number(perPage),
            page: Number(page)
        }
        const pagination = new PaginationResponse<Album[]>()
        pagination.data = result
        pagination.meta = paginationMeta

        return pagination
    }
}
