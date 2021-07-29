import "reflect-metadata"
import {PictureServiceImpl} from "@gallery/service/picture/picture-service-impl";
import {mocked} from "ts-jest/utils";
import {getCustomRepository} from "typeorm";
import {Photo} from "@gallery/entity/photo";

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
const pictureService = new PictureServiceImpl()

describe("Picture Service index", () => {
    test('should no error', async function () {
        const list = [new Photo(), new Photo()]
        const photoRepository = { findByPaginate: jest.fn().mockReturnValue(list) }
        // @ts-ignore
        mocked(getCustomRepository, true).mockResolvedValue(photoRepository)

        const actual = await pictureService.index(1, 2, null)

        expect(actual).toBe(list)
    });
})
