import jwt from "jsonwebtoken";
import { consts } from "@config/constants";

export class AuthToken {
  public generateToken(id: string, email: string): string {
    return jwt.sign({ id, email }, consts.jwtSecret, { expiresIn: "1h" });
  }
}
