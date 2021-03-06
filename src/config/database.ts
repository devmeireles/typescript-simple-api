import { Product } from "@entities/Product";
import { Store } from "@entities/Store";
import { User } from "@entities/User";
import { Library } from "@entities/Library";
import { ConnectionOptions, DatabaseType } from "typeorm";
import env from "dotenv";

env.config();

const type: DatabaseType = "postgres";
const host: string = process.env.DEV_DB_HOST;
const port: number = parseInt(process.env.DEV_DB_PORT);
const username: string = process.env.DEV_DB_USERNAME;
const password: string = process.env.DEV_DB_PASSWORD;
const database: string = process.env.DEV_DB_DATABASE;

const databaseConfig: ConnectionOptions = {
  name: "default",
  type,
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  logging: false,
  entities: [User, Store, Product, Library],
  migrations: ["src/database/migrations/**/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};

export default databaseConfig;
