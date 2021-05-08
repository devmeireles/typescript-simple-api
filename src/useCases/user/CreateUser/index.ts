import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";
import { SQSProvider } from "@repositories/implementations/SQSProvider";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const userRepository = new PostgresUserRepository();
const sQSProvider = new SQSProvider();

const createUserUseCase = new CreateUserUseCase(
  userRepository,
  sQSProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
