import { User } from "@entities/User";
import { IResetPasswordRequestDTO } from "@useCases/auth/resetPassword/ResetPasswordRequestDTO";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  findByID(id: string): Promise<User>;
  create(User: User): Promise<User>;
  updateOne(id: string, User: User): Promise<User>;
  updatePassword(id: string, User: IResetPasswordRequestDTO): Promise<void>;
  findByEmailAndActivation(email: string, activation: string): Promise<User>;
  activate(id: string): Promise<void>;
}
