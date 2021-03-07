import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { routes } from "./routes/index";
// import { userRouter } from './routes/user';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    // this.setDBConfig();
    this.setupRoutes();
  }

  private setConfig(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private setupRoutes(): void {
    this.app.use(routes.userRouter);
    this.app.use(routes.productRouter);
  }
}

export default new App().app;
