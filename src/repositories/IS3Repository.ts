import { File } from "@src/interfaces/IFile";

export interface IS3Repository {
    uploadFile(file: File, owner: string): Promise<File>;
}