import {StorageService} from "@gallery/service/storage/storage-service";
import {injectable} from "inversify";
import {UploadFileResponse} from "@gallery/pojo/response/storage/upload-file-response";
import {Storage} from "@google-cloud/storage";
import path from "path";
import * as fs from "fs";
import {getUnixTime} from "date-fns";

@injectable()
export class StorageServiceImpl implements StorageService {
    private cloudStorageClient: Storage
    private bucketName: string = "gallery-photo-bucket2"

    constructor() {
        this.cloudStorageClient = new Storage({
            keyFilename: "gcp-key.json",
            keyFile: path.resolve(process.cwd(), "gcp-key.json")
        })
    }

    async uploadFile(base64: string, fileName: string): Promise<UploadFileResponse> {
        let buffer = new Buffer(base64, "base64")
        let fileExtension = fileName.split(".")[1]
        let fileTmpName = `photo/photo-${getUnixTime(new Date())}.${fileExtension}`
        let generatedTmpPath = `${process.cwd()}/tmp/${fileTmpName}`
        fs.writeFileSync(generatedTmpPath, buffer)

        await this.cloudStorageClient.bucket(this.bucketName).upload(
            generatedTmpPath,
            { destination: fileTmpName }
        )

        fs.unlinkSync(generatedTmpPath)

        return {
            link: `https://storage.googleapis.com/${this.bucketName}/${fileTmpName}`
        }
    }
}
