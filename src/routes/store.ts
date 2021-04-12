import checkJWT from "@middlewares/checkJWT";
import { createStoreController } from "@useCases/store/CreateStore";
import { Router, Request, Response } from "express";
import { validateStore } from "@useCases/store/CreateStore/CreateStoreValidation";
import { updateStoreController } from "@useCases/store/UpdateStore";

const storeRouter = Router();

storeRouter.post(
  "/",
  [checkJWT],
  validateStore,
  (req: Request, res: Response) => {
    return createStoreController.handle(req, res);
  }
);

storeRouter.put("/:id", [checkJWT], (req: Request, res: Response) => {
  return updateStoreController.handle(req, res);
});

export { storeRouter };
