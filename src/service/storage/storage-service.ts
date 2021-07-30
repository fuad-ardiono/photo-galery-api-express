import {UploadFileResponse} from "@gallery/pojo/response/storage/upload-file-response";

export interface StorageService {
    uploadFile(base64: string, fileName: string): Promise<UploadFileResponse>
}
