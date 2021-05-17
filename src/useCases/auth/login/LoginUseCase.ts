import { ILoggedUser } from "@interfaces/ILoggedUser";
import { IUserRepository } from "@repositories/index";
import { AuthToken } from "@utils/AuthToken";

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<ILoggedUser> {
    const currentUser = await this.userRepository.findByEmail(email);

    if (!currentUser) {
      throw new Error("User not found");
    }

    const hashIsTrue: boolean = await currentUser.compareHash(password);

    if (!hashIsTrue) {
      throw new Error("Wrong login data");
    }

    const token: string = new AuthToken().generateToken(
      currentUser.id,
      currentUser.email
    );

    const loggedUser: ILoggedUser = {
      name: currentUser.name,
      id: currentUser.id,
      email: currentUser.email,
      token,
    };

    return loggedUser;
  }
}
