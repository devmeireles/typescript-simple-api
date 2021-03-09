import cors from "cors";
import express from "express";
import { createConnection } from "typeorm";
import { routes } from "./routes/index";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setDB();
    this.setupRoutes();
  }

  private setConfig(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setDB(): void {
    createConnection();
  }

  private setupRoutes(): void {
    this.app.use(routes.userRouter);
    this.app.use(routes.productRouter);
  }
}

export default new App().app;
