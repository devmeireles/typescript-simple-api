import { File } from "@interfaces/IFile";
import { IS3Repository } from "@repositories/IS3Repository";
import { Library } from "@entities/Library";

export class UploadFileUseCase {
    constructor(
        private S3Repository: IS3Repository
    ) { }

    async execute(file: File, owner: string): Promise<Library> {

        const fileData = await this.S3Repository.uploadFile(file, owner);

        const store = new Library(fileData);

        return store;
    }
}