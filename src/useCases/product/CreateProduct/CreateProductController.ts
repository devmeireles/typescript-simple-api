import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, owner_id, store_id, price } = req.body;

    try {
      const product = await this.createProductUseCase.execute({
        name,
        description,
        owner_id,
        store_id,
        price,
      });

      return res.status(201).json({
        success: true,
        data: product,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.detail || err.message,
      });
    }
  }
}
