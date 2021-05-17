import {
  PostgresUserRepository,
  SQSProvider,
} from "@repositories/implementations";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const userRepository = new PostgresUserRepository();
const sQSProvider = new SQSProvider();

const createUserUseCase = new CreateUserUseCase(userRepository, sQSProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
