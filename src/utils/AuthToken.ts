import jwt from "jsonwebtoken";
import config from "@config/constants";

export class AuthToken {
  public generateToken(id: string, email: string): string {
    return jwt.sign({ id, email }, config.jwtSecret, { expiresIn: "1h" });
  }
}
