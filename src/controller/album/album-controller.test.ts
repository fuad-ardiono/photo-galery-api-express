import "reflect-metadata";
import {Request, Response} from "express";
import {MetaPagination, PaginationResponse} from "@gallery/pojo/response/pagination-response";
import {Photo} from "@gallery/entity/photo";
import {AlbumService} from "@gallery/service/album/album-service";
import {AlbumController} from "@gallery/controller/album/album-controller";
import {Album} from "@gallery/entity/album";

jest.mock("express", () => ({
    Request: jest.fn()
}));

jest.mock("@gallery/service/album/album-service-impl", () => ({
    index: jest.fn()
}))

const albumServiceMock = {
    index: jest.fn()
} as AlbumService

const albumController = new AlbumController(albumServiceMock)

describe("Album Controller index", () => {
    test("should no error", async () => {
        // @ts-ignore
        const requestMock = {
            query: {
                page: 1,
                perPage: 2,
                title: null
            }
        } as Request

        const responseExpected = new PaginationResponse<Album[]>()
        responseExpected.data = [new Album(), new Album()]
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

        const actual = await albumController.index(requestMock, responseMock)

        expect(actual).toEqual(responseExpected)
    })
})
