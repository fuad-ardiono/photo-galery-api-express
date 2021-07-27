import "reflect-metadata"
import {PictureServiceImpl} from "@gallery/service/picture/picture-service-impl";

const pictureService = new PictureServiceImpl()

describe("Picture Service index", () => {
    test('should no error', function () {
        expect(pictureService.index()).toEqual("Hello World")
    });
})
