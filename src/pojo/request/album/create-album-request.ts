import {Expose} from "class-transformer";

export class CreateAlbumRequest {
    @Expose({ name: "title" })
    title: string
}
