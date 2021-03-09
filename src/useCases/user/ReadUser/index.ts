import { PostgresUsersRepository } from "@repositories/implementations/PostgresUsersRepository";
import { ReadUserController } from "./ReadUserController";
import { ReadUserUseCase } from "./ReadUserUseCase";

const postgresUsersRepository = new PostgresUsersRepository();

const readUserUseCase = new ReadUserUseCase(postgresUsersRepository);

const readUserController = new ReadUserController(readUserUseCase);

export { readUserUseCase, readUserController };
