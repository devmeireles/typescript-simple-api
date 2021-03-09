import { Request, Response } from "express";
import { ReadUserUseCase } from "./ReadUserUseCase";

export class ReadUserController {
  constructor(private readUserUseCase: ReadUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const user = await this.readUserUseCase.execute(id);

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({
        message: err.detail || err.message || "Unexpected error.",
      });
    }
  }
}
