import { Store } from "@entities/Store";
import { IStoreRepository } from "@repositories/IStoreRepository";
import { ICreateStoreDTO } from "./CreateStoreDTO";

export class CreateStoreUseCase {
    constructor(private storeRepository: IStoreRepository) { }

    async execute(data: ICreateStoreDTO): Promise<Store> {
        const storeAlreadyExists = await this.storeRepository.findByOwnerID(
            data.owner_id
        );

        console.log(storeAlreadyExists);

        if (storeAlreadyExists) {
            throw new Error("This user already has a store.");
        }

        const store = new Store(data);

        await this.storeRepository.create(store);

        return store;

    }
}