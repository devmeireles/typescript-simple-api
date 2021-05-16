import { File } from "@src/interfaces/IFile";
import { Request, Response } from "express";
import { UploadFileUseCase } from "./UploadFileUseCase";

export class UploadFileController {
  constructor(private uploadFIleUseCase: UploadFileUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { file }: { file: File } = req.body;
    const { owner } = req.body;

    try {
      if (owner !== res.locals.jwtPayload.id) {
        throw new Error("User not authorized");
      }

      const upload = await this.uploadFIleUseCase.execute(file, owner);

      return res.status(201).json({
        success: true,
        data: upload,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.detail || err.message,
      });
    }
  }
}
