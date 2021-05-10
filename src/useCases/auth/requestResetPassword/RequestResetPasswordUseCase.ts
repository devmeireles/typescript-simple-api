import { ILoggedUser } from "@src/interfaces/ILoggedUser";
import { IUserRepository } from "@src/repositories/IUserRepository";
import { IRequestPasswordRequestDTO } from "./IRequestPasswordRequestDTO";
import { ISQSRepository } from "@src/repositories/ISQSRepository";
import { consts } from "@config/constants";
import { v4 as uuid } from "uuid";

export class RequestResetPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private SQSRepository: ISQSRepository
  ) {}

  async execute(data: IRequestPasswordRequestDTO): Promise<ILoggedUser> {
    const { email } = data;
    const currentUser = await this.userRepository.findByEmail(email);

    if (!currentUser) {
      throw new Error("User not found");
    }

    data.current_token = uuid();
    const user = await this.userRepository.updateOne(currentUser.id, data);

    await this.SQSRepository.sendMessage(user, consts.MODULES.UPDATE_ACCOUNT);

    const loggedUser: ILoggedUser = {
      name: currentUser.name,
      id: currentUser.id,
      email: currentUser.email,
    };

    return loggedUser;
  }
}
