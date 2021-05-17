import { IUserRepository, ISQSRepository } from "@repositories/index";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "@entities/User";
import { consts } from "@config/constants";
import { ICreatedUser } from "@interfaces/ICreatedUser";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private SQSRepository: ISQSRepository
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<ICreatedUser> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    const newUser = await this.userRepository.create(user);

    await this.SQSRepository.sendMessage(
      newUser,
      consts.MODULES.CREATE_ACCOUNT
    );

    return newUser;
  }
}
