import { createStoreController } from "@useCases/store/CreateStore";
import { Router, Request, Response } from "express";

const storeRouter = Router();


// storeRouter.get("/user/:id", (req: Request, res: Response) => {
//     return readUserController.handle(req, res);
// });

storeRouter.post("/", (req: Request, res: Response) => {
    return createStoreController.handle(req, res);
});

// storeRouter.put("/user/:id", (req: Request, res: Response) => {
//     return updateUserController.handle(req, res);
// });

export { storeRouter };
