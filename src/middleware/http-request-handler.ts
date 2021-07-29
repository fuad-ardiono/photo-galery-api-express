import express from "express";
import {ExceptionResponse} from "@gallery/pojo/response/exception-response";
import {classToPlain} from "class-transformer";
import {DataNotFoundException} from "@gallery/exception/datanotfound-exception";

export const httpRequestHandler = (error: DataNotFoundException, req: express.Request, res: express.Response, next: express.NextFunction) => {
    switch (error.name) {
        case "DataNotFound": {
            const response = new ExceptionResponse()
            response.message = error.message
            response.statusCode = 404

            res.status(404)
            res.send(classToPlain(response))
            break
        }
        case "Unauthorized": {
            const response = new ExceptionResponse()
            response.message = error.message
            response.statusCode = 401

            res.status(401)
            res.send(classToPlain(response))
            break
        }
        default: {
            console.log(error)
            const response = new ExceptionResponse()
            response.message = "Something happen, please try again later"
            response.statusCode = 400

            res.status(400)
            res.send(classToPlain(response))
        }
    }
    next()
}
