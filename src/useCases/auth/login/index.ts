import { PostgresUsersRepository } from "@repositories/implementations/PostgresUsersRepository";
import { LoginController } from "./LoginController";
import { LoginUseCase } from "./LoginUseCase";

const postgresUsersRepository = new PostgresUsersRepository();

const loginUseCase = new LoginUseCase(postgresUsersRepository);

const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
