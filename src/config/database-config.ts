import { DataSourceOptions } from 'typeorm';
import "dotenv/config";


const databaseConfig: DataSourceOptions = {
  type: process.env.DB_TYPE  as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  // schema: process.env.DB_SCHEMA,
  entities: [__dirname + "/../modules/**/*.entity.{js,ts}"],
  migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
  synchronize: process.env.DB_SYNC === "true" ? true : false,
  logging: true, // process.env.DB_LOGGING === "true" ? true : false,
  migrationsRun: process.env.DB_MIGRATIONS_RUN === "true" ? true : false,
};


// export const PostgreSqlDataSource: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.PG_HOST,
//   port: parseInt(process.env.PG_PORT),
//   username: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DB,
//   schema: process.env.DB_SCHEMA,
//   entities: [User, Topic, Comment],
//   autoLoadEntities: true,
//   synchronize: true,
//   logging: true,
// };

export default databaseConfig;
