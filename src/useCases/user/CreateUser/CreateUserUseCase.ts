import { IUserRepository } from "@repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "@entities/User";
import { IMailRepository } from "@src/repositories/IMailRepository";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private mailRepository: IMailRepository
  ) { }

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    const newUser = await this.userRepository.create(user);

    await this.mailRepository.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      subject: 'Seja bem-vindo à plataforma',
      body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    }, "CREATE_ACCOUNT");

    return newUser;
  }
}
