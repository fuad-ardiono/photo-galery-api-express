import {injectable} from "inversify";
import {PictureService} from "./picture-service";

@injectable()
export class PictureServiceImpl implements PictureService {
    index(): string {
        return "Hello World"
    }
}
