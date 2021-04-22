import { Request, Response, Router } from "express";
import { loginController } from "@useCases/auth/login";
import { activeAccountController } from '@useCases/auth/activateAccount';
import { resetPasswordController } from '@useCases/auth/resetPassword';

const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response) => {
  return loginController.handle(req, res);
});

authRouter.post("/activate", (req: Request, res: Response) => {
  return activeAccountController.handle(req, res);
});

authRouter.post("/reset-password", (req: Request, res: Response) => {
  return resetPasswordController.handle(req, res);
});

export { authRouter };
