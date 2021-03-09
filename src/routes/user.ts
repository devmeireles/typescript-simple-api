import { Request, Response, Router } from "express";
import { createUserController } from "@useCases/user/CreateUser";
import { updateUserController } from "@useCases/user/UpdateUser";
import { readUserController } from "@useCases/user/ReadUser";

const userRouter = Router();

userRouter.get("/user/:id", (req: Request, res: Response) => {
  return readUserController.handle(req, res);
});

userRouter.post("/user", (req: Request, res: Response) => {
  return createUserController.handle(req, res);
});

userRouter.put("/user/:id", (req: Request, res: Response) => {
  return updateUserController.handle(req, res);
});

export { userRouter };
