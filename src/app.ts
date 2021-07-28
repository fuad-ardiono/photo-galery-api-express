import "reflect-metadata";
import "module-alias/register"
import express from 'express'
import dotEnv from 'dotenv'
import {Service} from "@gallery/service/service"
import {InversifyExpressServer} from "inversify-express-utils";
import "@gallery/controller/picture/picture-controller"

dotEnv.config()
const app = express()

let server =  new InversifyExpressServer(Service, null, { rootPath: "/api" }, app);

let appConfigured = server.build();
// @ts-ignore
let serve = appConfigured.listen(process.env.API_PORT || 3000, () => console.log(`App running on ${serve.address().port}`));
