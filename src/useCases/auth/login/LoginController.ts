import { Request, Response } from "express";
import { LoginUseCase } from "./LoginUseCase";

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const user = await this.loginUseCase.execute(email, password);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.detail || err.message,
      });
    }
  }
}
