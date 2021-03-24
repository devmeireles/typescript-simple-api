import { Request, Response, Router } from "express";
import { createUserController } from "@useCases/user/CreateUser";
import { updateUserController } from "@useCases/user/UpdateUser";
import { readUserController } from "@useCases/user/ReadUser";

const userRouter = Router();

userRouter.get("/:id", (req: Request, res: Response) => {
  return readUserController.handle(req, res);
});

userRouter.post("/", (req: Request, res: Response) => {
  return createUserController.handle(req, res);
});

userRouter.put("/:id", (req: Request, res: Response) => {
  return updateUserController.handle(req, res);
});

export { userRouter };
