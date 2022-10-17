import { ConnectionOptions } from "typeorm";
import { UserRegistration } from "../models";
import { Customer, CustomerGroup } from "../models";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "customer",
  entities: [UserRegistration, Customer, CustomerGroup],
  synchronize: true,
};
export default config;
