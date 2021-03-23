import { Store } from "@entities/Store";

export interface IUpdateUserRequestDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  active?: boolean;
  language?: string;
  store?: Store;
  readonly hashPassword?;
  readonly compareHash?;
}
