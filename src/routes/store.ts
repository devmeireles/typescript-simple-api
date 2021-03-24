import checkJWT from "../middlewares/checkJWT";
import { createStoreController } from "@useCases/store/CreateStore";
import { Router, Request, Response } from "express";

const storeRouter = Router();

storeRouter.post("/", [checkJWT], (req: Request, res: Response) => {
  return createStoreController.handle(req, res);
});

export { storeRouter };
