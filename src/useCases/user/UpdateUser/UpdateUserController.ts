import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password, language } = req.body;
    try {
      await this.updateUserUseCase.execute({
        id,
        name,
        email,
        password,
        language,
      });

      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({
        message: err.detail || err.message,
      });
    }
  }
}
