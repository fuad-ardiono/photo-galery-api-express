import {EntityRepository, IsNull, Like, Not, Repository} from "typeorm";
import {Album} from "@gallery/entity/album";
import {MetaPagination, PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {DataNotFoundException} from "@gallery/exception/datanotfound-exception";

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album> {
    private albumNotFoundMessage: string = "Data album tidak ditemukan"

    async findByPaginate(perPage: number, page: number, title: string|null) {
        const [result, total] = await this.findAndCount({
            join: { alias: "album", innerJoinAndSelect: { photos: "album.photos" } },
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

    async findOneById(id: number): Promise<Album> {
        const album = await this.findOne({
            where: {
                id
            }
        })

        if(album) {
            return album
        }

        throw new DataNotFoundException(this.albumNotFoundMessage)
    }

    async deleteById(id: number): Promise<Album> {
        const album = await this.findOne({
            where: {
                id
            }
        })

        if (album) {
            album.deletedAt = new Date()

            return await this.save(album)
        }

        throw new DataNotFoundException(this.albumNotFoundMessage)
    }
}
