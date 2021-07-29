import {Expose} from "class-transformer";

export class AuthRequest {
    @Expose({ name: "email"})
    email: string

    @Expose({ name: "password" })
    password: string
}
