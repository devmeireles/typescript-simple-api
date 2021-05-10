import { User } from "@entities/User";

export interface IUserMessageQueue extends User {
  message_type: string;
}
