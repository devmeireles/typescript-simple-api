import { IUserMessageQueue } from "@interfaces/IUserMessageQueue";
import { IMailRepository } from "@repositories/IMailRepository";

export class CreateAccountConsumer {
  constructor(private mailRepository: IMailRepository) {}

  async execute(data: IUserMessageQueue) {
    await this.mailRepository.sendCreateAccountMail(
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
