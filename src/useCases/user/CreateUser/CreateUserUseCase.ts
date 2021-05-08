import { IUserRepository } from "@repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "@entities/User";
import { ISQSRepository } from "@src/repositories/ISQSRepository";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private SQSRepository: ISQSRepository,
  ) { }

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    const newUser = await this.userRepository.create(user);

    await this.SQSRepository.sendMessage(newUser);

    return newUser;
  }
}
