import { IMailRepository } from "@repositories/IMailRepository";

export class ResetPasswordConsumer {
  constructor(private mailRepository: IMailRepository) {}

  async execute(data) {
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
