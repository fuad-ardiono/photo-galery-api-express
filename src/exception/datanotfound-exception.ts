import express from "express";
import {ExceptionResponse} from "@gallery/pojo/response/exception-response";
import {classToPlain} from "class-transformer";

export class DataNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DataNotFound"
    }
}

export const dataNotFoundExceptionHandler = (error: DataNotFoundException, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error.name == "DataNotFound") {
        const response = new ExceptionResponse()
        response.message = error.message
        response.statusCode = 404

        res.status(404)
        res.send(classToPlain(response))
    }
    next()
}
