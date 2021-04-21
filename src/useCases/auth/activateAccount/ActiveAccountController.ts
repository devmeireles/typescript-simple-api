import { Request, Response } from "express";
import { ActivateAccountUseCase } from "./ActivateAccountUseCase";

export class ActiveAccountController {
  constructor(private activateAccountUseCase: ActivateAccountUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, activation } = req.body;

    try {
      const user = await this.activateAccountUseCase.execute(email, activation);

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
