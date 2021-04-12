import { Store } from "@entities/Store";
import { getRepository } from "typeorm";
import { IStoreRepository } from "../IStoreRepository";

export class PostgresStoreRepository implements IStoreRepository {
  async findByID(id: string): Promise<Store> {
    const store = await getRepository(Store).findOne({
      where: { id },
    });

    return store;
  }

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

  async updateOne(id: string, store: Store): Promise<Store> {
    await getRepository(Store).update(id, store);

    return store;
  }
}
