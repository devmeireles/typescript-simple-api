import { ILoggedUser } from "@src/interfaces/ILoggedUser";
import { IUsersRepository } from "@src/repositories/IUsersRepository";
import { AuthToken } from "@utils/AuthToken";

export class LoginUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(email: string, password: string): Promise<ILoggedUser> {
    const currentUser = await this.usersRepository.findByEmail(email);

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
      email: currentUser.email,
      token,
    };

    return loggedUser;
  }
}
