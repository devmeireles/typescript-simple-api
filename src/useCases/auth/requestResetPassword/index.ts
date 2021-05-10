import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";
import { SQSProvider } from "@repositories/implementations/SQSProvider";
import { RequestResetPasswordController } from "./RequestResetPasswordController";
import { RequestResetPasswordUseCase } from "./RequestResetPasswordUseCase";

const userRepository = new PostgresUserRepository();
const sQSProvider = new SQSProvider();

const requestResetPasswordUseCase = new RequestResetPasswordUseCase(
  userRepository,
  sQSProvider
);

const requestResetPasswordController = new RequestResetPasswordController(
  requestResetPasswordUseCase
);

export { requestResetPasswordUseCase, requestResetPasswordController };
