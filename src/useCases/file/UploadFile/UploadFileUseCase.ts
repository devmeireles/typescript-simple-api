import { File } from "@interfaces/IFile";
import { IS3Repository } from "@repositories/IS3Repository";
import { Library } from "@entities/Library";
import { ILibraryRepository } from "@repositories/ILibraryRepository";
import { consts } from "@config/constants";

export class UploadFileUseCase {
  constructor(
    private S3Repository: IS3Repository,
    private libraryRepository: ILibraryRepository
  ) { }

  async execute(file: File, owner: string): Promise<Library> {
    const fileData = await this.S3Repository.uploadFile(file, owner);

    const libSize = await this.libraryRepository.getLibSize(owner);

    if (libSize > consts.AWS.MAX_BUCKET_SIZE || (fileData.size + libSize) > consts.AWS.MAX_BUCKET_SIZE) {
      throw new Error("Library limit exceeded.");
    }

    fileData.asset_type = consts.ASSET_TYPE.STORE_AVATAR;
    const store = await this.libraryRepository.create(fileData);

    return store;
  }
}
