import { User } from "@entities/User";
import { IUserRepository } from "@src/repositories/IUserRepository";
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

  async create(user: User): Promise<User> {
    return await getRepository(User).save(user);
  }

  async updateOne(id: string, user: User): Promise<User> {
    await getRepository(User).update(id, user);

    return user;
  }
}
