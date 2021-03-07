import { User } from "@entities/User";

export interface IUsersRepository{
  findByEmail(email: string): Promise<User>;
  create(User: User): Promise<void>;
}