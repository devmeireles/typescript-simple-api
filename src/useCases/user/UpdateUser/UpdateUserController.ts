import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
      const user = await this.updateUserUseCase.execute({
        id,
        name,
        email,
        password,
      });

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: err.detail || err.message || "Unexpected error.",
      });
    }
  }
}
