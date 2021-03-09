import { User } from "@entities/User";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserRequestDTO";

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUpdateUserRequestDTO): Promise<User> {
    const { id } = data;

    const currentUser = await this.usersRepository.findByID(id);

    if (!currentUser) {
      throw new Error("User does not exist");
    }

    const user = await this.usersRepository.updateOne(id, data);

    return user;
  }
}
