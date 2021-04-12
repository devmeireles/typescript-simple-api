import { PostgresStoreRepository } from "@repositories/implementations/PostgresStoreRepository";

import { UpdateStoreController } from "./UpdateStoreController";
import { UpdateStoreUseCase } from "./UpdateStoreUseCase";

const storeRepository = new PostgresStoreRepository();

const updateStoreUseCase = new UpdateStoreUseCase(storeRepository);

const updateStoreController = new UpdateStoreController(updateStoreUseCase);

export { updateStoreUseCase, updateStoreController };
