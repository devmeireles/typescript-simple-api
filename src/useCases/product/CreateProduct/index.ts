import {
  PostgresStoreRepository,
  PostgresUserRepository,
  PostgresProductRepository,
} from "@repositories/implementations";
import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const storeRepository = new PostgresStoreRepository();
const userRepository = new PostgresUserRepository();
const productRepository = new PostgresProductRepository();

const createProductUseCase = new CreateProductUseCase(
  storeRepository,
  userRepository,
  productRepository
);

const createProductController = new CreateProductController(
  createProductUseCase
);

export { createProductUseCase, createProductController };
