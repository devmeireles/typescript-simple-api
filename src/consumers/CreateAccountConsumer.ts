import { IMailRepository } from "@src/repositories/IMailRepository";

export class CreateAccountConsumer {
  constructor(private mailRepository: IMailRepository) {}

  async execute(data) {
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
