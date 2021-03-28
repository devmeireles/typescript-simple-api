import { Store } from "@entities/Store";
import { IStoreRepository } from "@repositories/IStoreRepository";
import { IUserRepository } from "@repositories/IUserRepository";
import { ICreateStoreDTO } from "./CreateStoreDTO";

export class CreateStoreUseCase {
  constructor(
    private storeRepository: IStoreRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateStoreDTO): Promise<Store> {
    const { owner_id, slug } = data;

    const userExists = await this.userRepository.findByID(owner_id);

    if (!userExists) {
      throw new Error("This user doesn't exist.");
    }

    const storeAlreadyExists = await this.storeRepository.findByOwnerID(
      owner_id
    );

    if (storeAlreadyExists) {
      throw new Error("This user already has a store.");
    }

    const storeSlugAlreadyExists = await this.storeRepository.findBySlug(
      slug
    );

    if (storeSlugAlreadyExists) {
      throw new Error("This slug already is in use.");
    }

    const store = new Store(data);

    await this.storeRepository.create(store);

    return store;
  }
}
