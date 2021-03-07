import { Router } from "express";
import { createUserController } from "@useCases/user/CreateUser";

const userRouter = Router();

userRouter.get("/user", (request, response) => {
  return createUserController.handle(request, response);
});

export { userRouter };
