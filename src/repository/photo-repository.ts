import {EntityRepository, IsNull, Like, Not, Repository} from "typeorm";
import {Photo} from "@gallery/entity/photo";
import {MetaPagination, PaginationResponse} from "@gallery/pojo/response/pagination-response";

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
    async findByPaginate(perPage: number, page: number, title: string|null) {
        const [result, total] = await this.findAndCount({
            relations: ['album'],
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
        const pagination = new PaginationResponse<Photo[]>()
        pagination.data = result
        pagination.meta = paginationMeta

        return pagination
    }
}
