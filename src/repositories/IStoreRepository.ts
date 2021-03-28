import { Store } from "@entities/Store";

export interface IStoreRepository {
  findByOwnerID(owner_id: string): Promise<Store>;
  findBySlug(slug: string): Promise<Store>;
  create(Store: Store): Promise<void>;
}
