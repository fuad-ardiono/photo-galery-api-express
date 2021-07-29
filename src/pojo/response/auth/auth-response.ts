import {User} from "@gallery/entity/user";

export interface AuthResponse {
    auth: {
        token: string
        exp: string
    },
    user: User
}
