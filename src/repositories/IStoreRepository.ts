import { Store } from "@entities/Store";

export interface IStoreRepository {
  findByID(id: string): Promise<Store>;
  findByOwnerID(owner_id: string): Promise<Store>;
  findBySlug(slug: string): Promise<Store>;
  create(Store: Store): Promise<void>;
  updateOne(id: string, Store: Store): Promise<Store>;
}
