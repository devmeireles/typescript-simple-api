import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";
import { ActiveAccountController } from "./ActiveAccountController";
import { ActivateAccountUseCase } from "./ActivateAccountUseCase";

const userRepository = new PostgresUserRepository();

const activateAccountUseCase = new ActivateAccountUseCase(userRepository);

const activeAccountController = new ActiveAccountController(activateAccountUseCase);

export { activateAccountUseCase, activeAccountController };
