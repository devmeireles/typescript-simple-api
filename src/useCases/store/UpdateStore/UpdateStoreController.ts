import { Slugfy } from "@src/utils/Slugfy";
import { Request, Response } from "express";
import { UpdateStoreUseCase } from "./UpdateStoreUseCase";

export class UpdateStoreController {
    constructor(private updateStoreUseCase: UpdateStoreUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, description } = req.body;

        const slug: string = new Slugfy().slug(name);

        try {
            await this.updateStoreUseCase.execute({
                id,
                slug,
                name,
                description
            });

            return res.status(204).send();
        } catch (err) {
            return res.status(400).json({
                message: err.detail || err.message,
            });
        }
    }
}