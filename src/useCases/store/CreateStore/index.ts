import { PostgresStoreRepository } from "@repositories/implementations/PostgresStoreRepository";
import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";
import { CreateStoreController } from "./CreateStoreController";
import { CreateStoreUseCase } from "./CreateStoreUseCase";

const storeRepository = new PostgresStoreRepository();
const userRepository = new PostgresUserRepository();

const createStoreUseCase = new CreateStoreUseCase(storeRepository, userRepository);

const createStoreController = new CreateStoreController(createStoreUseCase);

export { createStoreUseCase, createStoreController }