import { Store } from "@entities/Store";

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
  active?: boolean;
  language?: string;
  store?: Store;
  activation?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  readonly hashPassword?;
  readonly compareHash?;
}
