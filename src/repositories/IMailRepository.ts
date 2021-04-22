import { User } from "@src/entities/User";

interface IAddress {
  email: string;
  name: string;
}

export interface IMessage {
  to: IAddress;
}

export interface IMailRepository {
  sendCreateAccountMail(message: IMessage, data: User): Promise<void>;
  sendResetPasswordMail(message: IMessage, data: User): Promise<void>;
}
