import {EntityRepository, IsNull, Like, Repository} from "typeorm";
import {Photo} from "@gallery/entity/photo";
import {MetaPagination, PaginationResponse} from "@gallery/pojo/pagination";

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
    async findByPaginate(perPage: number, page: number) {
        const [result, total] = await this.findAndCount({
            order: {
                createdAt: 'DESC'
            },
            where: {
              deletedAt: IsNull()
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

    async findByTitle(title: string) {
        return await this.find({
            title: Like(`%${title}%`)
        })
    }
}
