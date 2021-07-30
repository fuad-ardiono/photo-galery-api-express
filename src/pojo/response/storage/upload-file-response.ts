import {Expose} from "class-transformer";

export class UploadFileResponse {
    @Expose({ name: "link" })
    link: string
}
