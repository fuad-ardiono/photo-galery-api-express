import {Expose} from "class-transformer";

export class ExceptionResponse {
    @Expose({ name: "message" })
    message: string

    @Expose({ name: "status_code" })
    statusCode: number
}
