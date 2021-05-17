import { PostgresUserRepository } from "@repositories/implementations";
import { ReadUserController } from "./ReadUserController";
import { ReadUserUseCase } from "./ReadUserUseCase";

const userRepository = new PostgresUserRepository();

const readUserUseCase = new ReadUserUseCase(userRepository);

const readUserController = new ReadUserController(readUserUseCase);

export { readUserUseCase, readUserController };
