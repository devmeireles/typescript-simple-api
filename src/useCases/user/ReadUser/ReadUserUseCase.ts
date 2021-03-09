import { User } from "@entities/User";
import { IUsersRepository } from "@repositories/IUsersRepository";

export class ReadUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const currentUser = await this.usersRepository.findByID(id);

    if (!currentUser) {
      throw new Error("User does not exist");
    }

    return currentUser;
  }
}
