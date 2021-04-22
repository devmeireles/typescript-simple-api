import { Request, Response } from "express";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export class ResetPasswordController {
    constructor(private resetPasswordUseCase: ResetPasswordUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { email, activation, password } = req.body;

        try {
            const user = await this.resetPasswordUseCase.execute({
                activation,
                email,
                password
            });

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
