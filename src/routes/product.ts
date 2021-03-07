import { Router } from "express";

const productRouter = Router();

productRouter.get("/product", (request, response) => {
  return response.status(200).json({
    message: "here in products",
  });
});

export { productRouter };
