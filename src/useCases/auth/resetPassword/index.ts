import { PostgresUserRepository } from "@repositories/implementations/PostgresUserRepository";
import { ResetPasswordController } from "./ResetPasswordController";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

const userRepository = new PostgresUserRepository();

const resetPasswordUseCase = new ResetPasswordUseCase(userRepository);

const resetPasswordController = new ResetPasswordController(
  resetPasswordUseCase
);

export { resetPasswordUseCase, resetPasswordController };
