import { Library } from "@entities/Library";
import { File } from "@interfaces/IFile";
import { getRepository } from "typeorm";
import { ILibraryRepository } from "../ILibraryRepository";

export class PostgresLibraryRepository implements ILibraryRepository {
  async getLibSize(owner: string): Promise<number> {
    const { sum } = await getRepository(Library)
      .createQueryBuilder("library")
      .select("SUM(library.size)", "sum")
      .where("owner_id = :owner", { owner })
      .getRawOne();

    return parseInt(sum);
  }

  async create(fileData: File): Promise<Library> {
    return await getRepository(Library).save(fileData);
  }
}
