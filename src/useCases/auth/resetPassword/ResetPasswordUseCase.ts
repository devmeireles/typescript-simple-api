import { ILoggedUser } from "@src/interfaces/ILoggedUser";
import { IUserRepository } from "@src/repositories/IUserRepository";
import { IResetPasswordRequestDTO } from "./ResetPasswordRequestDTO";
import bcrypt from "bcryptjs";

export class ResetPasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IResetPasswordRequestDTO): Promise<ILoggedUser> {
    const { email, activation } = data;

    const currentUser = await this.userRepository.findByEmailAndToken(
      email,
      activation
    );

    if (!currentUser) {
      throw new Error("User not found");
    }

    data.password = await bcrypt.hash(data.password, 10);

    await this.userRepository.updatePassword(currentUser.id, data);

    const loggedUser: ILoggedUser = {
      name: currentUser.name,
      id: currentUser.id,
      email: currentUser.email,
    };

    return loggedUser;
  }
}
