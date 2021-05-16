import "module-alias/register";
import cors from "cors";
import env from "dotenv";
import express from "express";
import { createConnection } from "typeorm";
import { routes } from "./routes/index";
import databaseConfig from "./config/database";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    env.config();
    this.setConfig();
    this.setDB();
    this.setupRoutes();
  }

  private setConfig(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private async setDB(): Promise<void> {
    await createConnection(databaseConfig);
  }

  private setupRoutes(): void {
    this.app.use("/user", routes.userRouter);
    this.app.use("/auth", routes.authRouter);
    this.app.use("/product", routes.productRouter);
    this.app.use("/store", routes.storeRouter);
    this.app.use("/file", routes.fileRouter);
  }
}

export default new App().app;
