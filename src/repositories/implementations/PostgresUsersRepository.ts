import { User } from "@entities/User";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { getRepository } from "typeorm";

export class PostgresUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User> {
    const user = await getRepository(User).findOneOrFail({
      where: { email },
    });

    return user;
  }

  async findByID(id: string): Promise<User> {
    const user = await getRepository(User).findOneOrFail({
      where: { id },
    });

    return user;
  }

  async create(user: User): Promise<void> {
    await getRepository(User).save(user);
  }

  async updateOne(id: string, user: User): Promise<User> {
    await getRepository(User).update(id, user);

    return user;
  }
}
