import { uploadFileController } from "@useCases/file/UploadFile";
import { Request, Response, Router } from "express";
import multer from "multer";
import fileHandler from "@middlewares/fileHandler";
import checkJWT from "@middlewares/checkJWT";

const fileRouter = Router();
const upload = multer();

fileRouter.post(
  "/upload",
  upload.single("file"),
  [fileHandler],
  [checkJWT],
  (req: Request, res: Response) => {
    return uploadFileController.handle(req, res);
  }
);

export { fileRouter };
