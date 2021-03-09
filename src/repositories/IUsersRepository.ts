import { User } from "@entities/User";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findByID(id: string): Promise<User>;
  create(User: User): Promise<void>;
  updateOne(id: string, User: User): Promise<User>;
}
