import { Store } from "@entities/Store";
import { getRepository } from "typeorm";
import { IStoreRepository } from "../IStoreRepository";

export class PostgresStoreRepository implements IStoreRepository {
  async findByOwnerID(owner_id: string): Promise<Store> {
    const store = await getRepository(Store).findOne({
      where: { owner_id },
    });

    return store;
  }

  async findBySlug(slug: string): Promise<Store> {
    const store = await getRepository(Store).findOne({
      where: { slug },
    });

    return store;
  }

  async create(store: Store): Promise<void> {
    await getRepository(Store).save(store);
  }
}
