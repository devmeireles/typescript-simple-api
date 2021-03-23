import { Store } from "@entities/Store";

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
  active?: boolean;
  language?: string;
  store?: Store;
  readonly hashPassword?;
  readonly compareHash?;
}
