import {AuthResponse} from "@gallery/pojo/response/auth/auth-response";
import {AuthRequest} from "@gallery/pojo/request/auth/auth-request";

export interface AuthService {
    signIn(request: AuthRequest): Promise<AuthResponse>
}
