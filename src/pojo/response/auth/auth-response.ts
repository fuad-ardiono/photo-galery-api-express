import {User} from "@gallery/entity/user";
import {Expose} from "class-transformer";

export class AuthResponse {
    @Expose({ name: "auth" })
    auth: AuthData | null

    @Expose({ name: "user" })
    user: User | null
}

export class AuthData {
    @Expose({ name: "token" })
    token: string | null

    @Expose({ name: "exp" })
    exp: number | null
}
