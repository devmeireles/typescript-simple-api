import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";
import { MailtrapMailProvider } from "@repositories/implementations/MailtrapMailProvider";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const userRepository = new PostgresUserRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const createUserUseCase = new CreateUserUseCase(userRepository, mailtrapMailProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
