import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";
import { LoginController } from "./LoginController";
import { LoginUseCase } from "./LoginUseCase";

const userRepository = new PostgresUserRepository();

const loginUseCase = new LoginUseCase(userRepository);

const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
