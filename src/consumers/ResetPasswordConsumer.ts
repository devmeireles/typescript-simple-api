import { IMailRepository } from "@repositories/index";
import { IUserMessageQueue } from "@interfaces/IUserMessageQueue";

export class ResetPasswordConsumer {
  constructor(private mailRepository: IMailRepository) {}

  async execute(data: IUserMessageQueue): Promise<void> {
    await this.mailRepository.sendResetPasswordMail(
      {
        to: {
          name: data.name,
          email: data.email,
        },
      },
      data
    );
  }
}
