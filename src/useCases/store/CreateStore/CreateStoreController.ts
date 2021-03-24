import { Request, Response } from "express";
import { CreateStoreUseCase } from "./CreateStoreUseCase";

export class CreateStoreController {
  constructor(private createStoreUseCase: CreateStoreUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, owner_id } = req.body;

    try {
      const store = await this.createStoreUseCase.execute({
        name,
        description,
        owner_id,
      });

      return res.status(201).json({
        success: true,
        data: store,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.detail || err.message,
      });
    }
  }
}
