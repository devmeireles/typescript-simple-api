import { Library } from "@entities/Library";
import { File } from "@interfaces/IFile";

export interface ILibraryRepository {
    getLibSize(owner: string): Promise<number>;
    create(fileData: File): Promise<Library>;
}