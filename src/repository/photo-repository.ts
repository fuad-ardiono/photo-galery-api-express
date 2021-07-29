import {EntityRepository, IsNull, Like, Not, Repository} from "typeorm";
import {Photo} from "@gallery/entity/photo";
import {MetaPagination, PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {DataNotFoundException} from "@gallery/exception/datanotfound-exception";
import {UpdatePictureRequest} from "@gallery/pojo/request/picture/update-picture-request";

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
    private photoNotFoundMessage: string = "Data foto tidak ditemukan"

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

    async updateById(id: number, request: UpdatePictureRequest) {
        const photo: Photo | undefined = await this.findOne({
            where: {
                id
            }
        })

        if (photo) {
            const updatePhoto = Object.assign(photo, request)
            updatePhoto.updatedAt = new Date()

            return await this.save(updatePhoto)
        }

        throw new DataNotFoundException(this.photoNotFoundMessage)
    }
}
