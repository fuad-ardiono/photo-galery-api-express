import "reflect-metadata";
import "module-alias/register"
import express from 'express'
import dotEnv from 'dotenv'
import {InversifyExpressServer } from "inversify-express-utils";
import {Service} from "@gallery/service/service";
import * as fs from "fs";
import {ConnectionOptions, createConnection} from "typeorm";
import {Photo} from "@gallery/entity/photo";
import {Album} from "@gallery/entity/album";
import {Role} from "@gallery/entity/role";
import {User} from "@gallery/entity/user";
import bodyParser from "body-parser";
import "@gallery/controller/auth/auth-controller"
import "@gallery/controller/picture/picture-controller"
import "@gallery/controller/album/album-controller"
import "@gallery/controller/storage/storage-controller"
import {httpRequestHandler} from "@gallery/middleware/http-request-handler";

const envData: any = dotEnv.parse(fs.readFileSync(`.env`));
const dbConfig: ConnectionOptions = {
    type: "mysql",
    host: envData.DB_HOST,
    port: envData.DB_PORT,
    username: envData.DB_USER,
    password: envData.DB_PASSWORD,
    database: envData.DB_NAME,
    entities: [Photo, Album, Role, User],
    synchronize: true,
    logging: false,
    logger: "advanced-console"
}

const app = express()

createConnection(dbConfig).then(async connection => {
    console.log("Connected to DB")

    let server =  new InversifyExpressServer(Service, null, { rootPath: "/api" }, app);
    server.setConfig((config) => {
        config.use(bodyParser.json())
    })
    server.setErrorConfig((config) => {
        config.use(httpRequestHandler)
    })

    let appConfigured = server.build();
    // @ts-ignore
    let serve = appConfigured.listen(envData.API_PORT || 3000, () => console.log(`App running on ${serve.address().port}`));
}).catch(error => console.log("TypeORM connection error: ", error))
