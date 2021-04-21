import { User } from "@entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  findByID(id: string): Promise<User>;
  create(User: User): Promise<User>;
  updateOne(id: string, User: User): Promise<User>;
  findByEmailAndActivation(email: string, activation: string): Promise<User>;
  activate(id: string): Promise<void>;
}
