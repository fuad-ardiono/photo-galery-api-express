import "module-alias/register"
import express from 'express'
import dotEnv from 'dotenv'
import {Service, ServiceTypes} from "@gallery/service/service"
import {PictureService} from "@gallery/service/picture/picture-service"

dotEnv.config()
const app = express()

const pictureService = Service.get<PictureService>(ServiceTypes.Picture)

app.get('/', (req, res) => {
    res.send(pictureService.index())
})

app.listen(process.env.API_PORT, () => {
    console.log(`⚡️[server]: Server is running at http://${process.env.API_HOST}:${process.env.API_PORT}`);
});
