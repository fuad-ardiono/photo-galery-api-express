import {controller, httpPost, httpPut, interfaces, request, response} from "inversify-express-utils";
import {inject} from "inversify";
import {ServiceTypes} from "@gallery/service/service-type";
import {AuthService} from "@gallery/service/auth/auth-service";
import express from "express";
import {plainToClass} from "class-transformer";
import {AuthRequest} from "@gallery/pojo/request/auth/auth-request";

@controller("/auth")
export class AuthController implements interfaces.Controller {
    constructor(@inject(ServiceTypes.Auth) private readonly authService: AuthService) {}

    @httpPost("/sign-in")
    public async signIn(@request() request: express.Request, @response() response: express.Response) {
        let auth = await this.authService.signIn(plainToClass(AuthRequest, request.body))

        return response.status(200).send(auth)
    }
}
