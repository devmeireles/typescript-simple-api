import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const userRepository = new PostgresUserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
