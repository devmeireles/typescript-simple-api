import { Request, Response, Router } from "express";
import { createUserController } from "@useCases/user/CreateUser";

const userRouter = Router();

userRouter.post("/user", (req: Request, res: Response) => {
  return createUserController.handle(req, res);
});

export { userRouter };
