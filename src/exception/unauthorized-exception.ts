import express from "express";
import {ExceptionResponse} from "@gallery/pojo/response/exception-response";
import {classToPlain} from "class-transformer";

export class UnauthorizedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Unauthorized"
    }
}

export const unauthorizedExceptionHandler = (error: UnauthorizedException, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error.name == "Unauthorized") {
        const response = new ExceptionResponse()
        response.message = error.message
        response.statusCode = 401

        res.status(401)
        res.send(classToPlain(response))
    }
    next()
}
