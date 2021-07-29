import express from "express";
import {UnauthorizedException} from "@gallery/exception/unauthorized-exception";
import * as jwt from "jsonwebtoken"
import dotEnv from "dotenv";
import fs from "fs";
import {ExceptionResponse} from "@gallery/pojo/response/exception-response";
import {classToPlain} from "class-transformer";

const envData: any = dotEnv.parse(fs.readFileSync(`.env`));

export const adminMiddlewareHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let token: string | undefined = req.get("Authorization")

    if (token) {
        try {
            const payload = jwt.verify(token, envData.JWT_SECRET)
            console.log(payload)
            // @ts-ignore
            req["user"] = payload
            next()
        } catch (e) {
            throw new UnauthorizedException("Token salah/expired")
        }
    } else {
        throw new UnauthorizedException("Akses tidak sah")
    }
}
