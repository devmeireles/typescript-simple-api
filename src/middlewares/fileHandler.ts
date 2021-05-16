import { File } from "@interfaces/IFile";
import { consts } from "@config/constants";
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

    if (file.size > consts.COMMONS.MAX_FILE_SIZE) {
      throw new Error("Exceeded file size");
    }

    if (!consts.COMMONS.ACCEPTED_FILES.includes(bodyFile.extension)) {
      throw new Error("Invalid format file");
    }

    Object.assign(req.body, { file: bodyFile });
  } catch (err) {
    res.status(401).send({
      success: false,
      message: err.detail || err.message,
    });
    return;
  }

  next();
};

export default fileHandler;
