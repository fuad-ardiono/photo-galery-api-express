export class DataNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DataNotFound"
    }
}
