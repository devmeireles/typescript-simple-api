interface IAddress {
  email: string;
  name: string;
}

type IMailType = "CREATE_ACCOUNT" | "RESET_PASSWORD"

export interface IMessage {
  to: IAddress;
}

export interface IMailRepository {
  sendMail(message: IMessage, type: IMailType): Promise<void>;
}