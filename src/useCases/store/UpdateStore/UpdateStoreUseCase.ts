import { IStoreRepository } from "@repositories/IStoreRepository";
import { Store } from "@entities/Store";
import { IUpdateStoreDTO } from "./UpdateStoreDTO";

export class UpdateStoreUseCase {
  constructor(private storeRepository: IStoreRepository) {}

  async execute(data: IUpdateStoreDTO): Promise<Store> {
    const { id } = data;

    const currentStore = await this.storeRepository.findByID(id);

    if (!currentStore) {
      throw new Error("Store does not exist");
    }

    const store = await this.storeRepository.updateOne(id, data);

    return store;
  }
}
