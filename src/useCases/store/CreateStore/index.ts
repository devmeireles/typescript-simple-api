import { PostgresStoreRepository } from "@repositories/implementations/PostgresStoreRepository";
import { CreateStoreController } from "./CreateStoreController";
import { CreateStoreUseCase } from "./CreateStoreUseCase";

const postgresStoreRepository = new PostgresStoreRepository();

const createStoreUseCase = new CreateStoreUseCase(postgresStoreRepository);

const createStoreController = new CreateStoreController(createStoreUseCase);

export { createStoreUseCase, createStoreController }