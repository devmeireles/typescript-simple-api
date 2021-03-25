import checkJWT from "../middlewares/checkJWT";
import { createProductController } from "@useCases/product/CreateProduct";
import { Router, Request, Response } from "express";

const productRouter = Router();

productRouter.post("/", [checkJWT], (req: Request, res: Response) => {
  return createProductController.handle(req, res);
});

export { productRouter };
