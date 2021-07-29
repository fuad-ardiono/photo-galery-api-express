import {AuthData, AuthResponse} from "@gallery/pojo/response/auth/auth-response";
import {AuthService} from "@gallery/service/auth/auth-service";
import {injectable} from "inversify";
import {getCustomRepository} from "typeorm";
import {UserRepository} from "@gallery/repository/user-repository";
import {AuthRequest} from "@gallery/pojo/request/auth/auth-request";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {UnauthorizedException} from "@gallery/exception/unauthorized-exception";
import {classToClass, classToPlain} from "class-transformer";
import dotEnv from "dotenv";
import fs from "fs";
import {add, getUnixTime} from "date-fns"

@injectable()
export class AuthServiceImpl implements AuthService {
    private unauthorizedMessage: string = "Email atau password salah"

    async signIn(request: AuthRequest): Promise<AuthResponse> {
        const envData: any = dotEnv.parse(fs.readFileSync(`.env`));

        const userRepository = await getCustomRepository(UserRepository)
        const user = await userRepository.findOneByEmail(request.email)

        if (user) {
            const isValidPassword = bcrypt.compareSync(request.password, user.password)

            if (isValidPassword) {
                let expire = add(new Date(), {hours: 8})

                let token = jwt.sign({
                    data: classToPlain(user),
                    exp: getUnixTime(expire)
                }, envData.JWT_SECRET)

                let response = new AuthResponse()
                let authData = new AuthData()
                authData.token = token
                authData.exp = getUnixTime(expire)

                response.user = classToClass(user)
                response.auth = authData

                return response
            } else {
                throw new UnauthorizedException(this.unauthorizedMessage)
            }
        }

        throw new UnauthorizedException(this.unauthorizedMessage)
    }
}
