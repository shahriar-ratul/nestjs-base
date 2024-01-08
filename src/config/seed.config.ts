import { DataSource } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { DataSourceOptions } from "typeorm/data-source";

import "dotenv/config";
import InitSeeder from "@/database/seeds/init.seeder";

const options = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + "/../database/entities/*.entity.{js,ts}"],
  migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
  extra: {
    charset: "utf8mb4_unicode_ci",
  },
  synchronize: false, // process.env.DB_SYNC === "true" ? true : false,
  logging: true, // process.env.DB_LOGGING === "true" ? true : false,
  migrationsRun: process.env.DB_MIGRATIONS_RUN === "true" ? true : false,
  seeds: [InitSeeder],
};

export const source = new DataSource(
  options as DataSourceOptions & SeederOptions,
);
