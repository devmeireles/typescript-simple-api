import { ILoggedUser } from "@interfaces/ILoggedUser";
import { IUserRepository } from "@repositories/IUserRepository";

export class ActivateAccountUseCase {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute(email: string, activation: string): Promise<ILoggedUser> {
    const currentUser = await this.userRepository.findByEmailAndActivation(
      email,
      activation
    );

    if (!currentUser) {
      throw new Error("User not found");
    }

    await this.userRepository.activate(currentUser.id);

    const loggedUser: ILoggedUser = {
      name: currentUser.name,
      id: currentUser.id,
      email: currentUser.email,
    };

    return loggedUser;
  }
}
