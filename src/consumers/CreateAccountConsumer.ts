import { IUserMessageQueue } from "@interfaces/IUserMessageQueue";
import { IMailRepository } from "@repositories/index";

export class CreateAccountConsumer {
  constructor(private mailRepository: IMailRepository) {}

  async execute(data: IUserMessageQueue): Promise<void> {
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
