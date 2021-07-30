import {Expose} from "class-transformer";

export class UploadFileRequest {
    @Expose({ name: "base64" })
    base64: string

    @Expose({ name: "file_name" })
    fileName: string
}
