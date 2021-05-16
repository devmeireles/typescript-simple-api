import { File } from "@interfaces/IFile";
import { Request, Response, NextFunction } from "express";

const fileHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): NextFunction => {
  try {
    const { file } = req;

    const bodyFile: File = {
      name: file.originalname,
      type: file.mimetype,
      content: file.buffer,
      size: file.size,
      extension: `${file.originalname.split(".").pop()}`,
    };

    Object.assign(req.body, { file: bodyFile });
  } catch (error) {
    res.status(401).send({
      success: false,
      message: error,
    });
    return;
  }

  next();
};

export default fileHandler;
