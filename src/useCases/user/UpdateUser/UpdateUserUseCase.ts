import { User } from "@entities/User";
import { IUserRepository } from "@src/repositories/IUserRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserRequestDTO";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IUpdateUserRequestDTO): Promise<User> {
    const { id } = data;

    const currentUser = await this.userRepository.findByID(id);

    if (!currentUser) {
      throw new Error("User does not exist");
    }

    const user = await this.userRepository.updateOne(id, data);

    return user;
  }
}
