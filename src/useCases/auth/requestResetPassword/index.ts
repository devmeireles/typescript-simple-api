import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";
import { MailtrapMailProvider } from "@repositories/implementations/MailtrapMailProvider";
import { RequestResetPasswordController } from "./RequestResetPasswordController";
import { RequestResetPasswordUseCase } from "./RequestResetPasswordUseCase";

const userRepository = new PostgresUserRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const requestResetPasswordUseCase = new RequestResetPasswordUseCase(userRepository, mailtrapMailProvider);

const requestResetPasswordController = new RequestResetPasswordController(requestResetPasswordUseCase);

export { requestResetPasswordUseCase, requestResetPasswordController };
