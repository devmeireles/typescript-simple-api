import { Request, Response } from "express";
import { RequestResetPasswordUseCase } from "./RequestResetPasswordUseCase";

export class RequestResetPasswordController {
  constructor(private requestResetPasswordUseCase: RequestResetPasswordUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const current_token: string = null;

    try {
      const user = await this.requestResetPasswordUseCase.execute({email, current_token});

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
