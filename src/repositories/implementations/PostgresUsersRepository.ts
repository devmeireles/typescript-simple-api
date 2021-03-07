import { User } from "@entities/User";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { getRepository } from "typeorm";

export class PostgresUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User> {
    const users = getRepository(User);
    const user = users.findOne({
      where: { email }
    })

    return user;
  }

  async create(user: User): Promise<void> {
    const users = getRepository(User);
    users.save(user);
  }
}
