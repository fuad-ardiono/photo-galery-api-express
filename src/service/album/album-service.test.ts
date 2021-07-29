import "reflect-metadata"
import {mocked} from "ts-jest/utils";
import {getCustomRepository} from "typeorm";
import {AlbumServiceImpl} from "@gallery/service/album/album-service-impl";
import {Album} from "@gallery/entity/album";

jest.mock("typeorm", () => ({
    getCustomRepository: jest.fn(),
    PrimaryGeneratedColumn: () => jest.fn(),
    Entity: () => jest.fn(),
    Column: () => jest.fn(),
    OneToMany: () => jest.fn(),
    ManyToOne: () => jest.fn(),
    JoinColumn: () => jest.fn(),
    Repository: class Mock<T> {},
    EntityRepository: () => jest.fn()
}))
const albumService = new AlbumServiceImpl()

describe("Album Service index", () => {
    test('should no error', async function () {
        const list = [new Album(), new Album()]
        const albumRepository = { findByPaginate: jest.fn().mockReturnValue(list) }
        // @ts-ignore
        mocked(getCustomRepository, true).mockResolvedValue(albumRepository)

        const actual = await albumService.index(1, 2, null)

        expect(actual).toBe(list)
    });
})
