import "reflect-metadata";
import {PictureController} from "@gallery/controller/picture/picture-controller";
import {Request, Response} from "express";
import {PictureService} from "@gallery/service/picture/picture-service";
import {MetaPagination, PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {Photo} from "@gallery/entity/photo";

jest.mock("express", () => ({
    Request: jest.fn()
}));

jest.mock("@gallery/service/picture/picture-service-impl", () => ({
    index: jest.fn()
}))

const pictureServiceMock = {
    index: jest.fn(),
    update: jest.fn()
} as PictureService

const pictureController = new PictureController(pictureServiceMock)

describe("Picture Controller index", () => {
    test("should no error", async () => {
        // @ts-ignore
        const requestMock = {
            query: {
                page: 1,
                perPage: 2,
                title: null
            }
        } as Request

        const responseExpected = new PaginationResponse<Photo[]>()
        responseExpected.data = [new Photo(), new Photo()]
        responseExpected.meta = {
            page: 10,
            per_page: 10,
            total: 100
        } as MetaPagination

        // @ts-ignore
        const responseMock = {
            status: jest.fn().mockImplementation(() => ({
                send: jest.fn().mockReturnValue(responseExpected)
            }))
        } as Response

        const actual = await pictureController.index(requestMock, responseMock)

        expect(actual).toEqual(responseExpected)
    })
})
