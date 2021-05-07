import { Product } from "./src/entities/Product";
import { Store } from "./src/entities/Store";
import { User } from "./src/entities/User";
import { ConnectionOptions, DatabaseType } from "typeorm";
import env from "dotenv";

env.config();

const type: DatabaseType = 'postgres';
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
    entities: [User, Store, Product],
    migrations: ["src/database/migrations/**/*.ts"],
    cli: {
        migrationsDir: "src/database/migrations",
    },
};

export default databaseConfig;