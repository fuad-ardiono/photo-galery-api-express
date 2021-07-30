import {Expose} from "class-transformer";

export class CreatePictureRequest {
    @Expose({ name: "title" })
    title: string

    @Expose({ name: "album_id" })
    albumId: number

    @Expose({ name: "url" })
    url: string

    @Expose({ name: "thumbnail_url" })
    thumbnailUrl: string
}
