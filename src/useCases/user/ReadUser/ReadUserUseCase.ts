import { User } from "@entities/User";
import { IUserRepository } from "@src/repositories/IUserRepository";

export class ReadUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    const currentUser = await this.userRepository.findByID(id);

    if (!currentUser) {
      throw new Error("User does not exist");
    }

    return currentUser;
  }
}
