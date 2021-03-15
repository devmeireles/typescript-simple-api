import { Request, Response, Router } from "express";
import { loginController } from "@useCases/auth/login";

const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response) => {
  return loginController.handle(req, res);
});

export { authRouter };
