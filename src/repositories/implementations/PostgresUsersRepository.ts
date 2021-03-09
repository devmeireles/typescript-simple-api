import { User } from "@entities/User";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { getRepository } from "typeorm";

export class PostgresUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User> {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({
      where: { email },
    });

    delete user.password;

    return user;
  }

  async findByID(id: string): Promise<User> {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({
      where: { id },
    });

    delete user.password;

    return user;
  }

  async create(user: User): Promise<void> {
    const userRepo = getRepository(User);
    await userRepo.save(user);
  }

  async updateOne(id: string, user: User): Promise<User> {
    const userRepo = getRepository(User);
    await userRepo.update(id, user);

    delete user.password;

    return user;
  }
}
