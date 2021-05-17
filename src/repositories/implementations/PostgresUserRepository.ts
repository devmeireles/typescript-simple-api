import { User } from "@entities/User";
import { IUserRepository } from "@repositories/index";
import { ICreatedUser } from "@interfaces/ICreatedUser";
import { IResetPasswordRequestDTO } from "@useCases/auth/resetPassword/ResetPasswordRequestDTO";
import { getRepository } from "typeorm";

export class PostgresUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User> {
    const user = await getRepository(User).findOne({
      where: { email },
    });

    return user;
  }

  async findByID(id: string): Promise<User> {
    const user = await getRepository(User).findOne({
      where: { id },
    });

    return user;
  }

  async findByEmailAndActivation(
    email: string,
    activation: string
  ): Promise<User> {
    const user = await getRepository(User).findOne({
      where: { email, activation },
    });

    return user;
  }

  async findByEmailAndToken(
    email: string,
    current_token: string
  ): Promise<User> {
    const user = await getRepository(User).findOne({
      where: { email, current_token },
    });

    return user;
  }

  async create(user: User): Promise<ICreatedUser> {
    const saved = await getRepository(User).save(user);

    const newUser: ICreatedUser = {
      id: saved.id,
      name: saved.name,
      email: saved.email,
      activation: saved.activation,
    };

    return newUser;
  }

  async updateOne(id: string, user: User): Promise<User> {
    await getRepository(User).update(id, user);

    return user;
  }

  async activate(id: string): Promise<void> {
    await getRepository(User).update(id, {
      active: true,
    });

    return null;
  }

  async updatePassword(
    id: string,
    user: IResetPasswordRequestDTO
  ): Promise<void> {
    await getRepository(User).update(id, {
      password: user.password,
      current_token: null,
    });

    return null;
  }
}
