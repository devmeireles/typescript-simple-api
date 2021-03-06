import { User } from "@entities/User";
import { ICreatedUser } from "@interfaces/ICreatedUser";
import { IRequestPasswordRequestDTO } from "@useCases/auth/requestResetPassword/IRequestPasswordRequestDTO";
import { IResetPasswordRequestDTO } from "@useCases/auth/resetPassword/ResetPasswordRequestDTO";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  findByID(id: string): Promise<User>;
  create(User: User): Promise<ICreatedUser>;
  updateOne(id: string, User: User | IRequestPasswordRequestDTO): Promise<User>;
  updatePassword(id: string, User: IResetPasswordRequestDTO): Promise<void>;
  findByEmailAndActivation(email: string, activation: string): Promise<User>;
  findByEmailAndToken(email: string, current_token: string): Promise<User>;
  activate(id: string): Promise<void>;
}
