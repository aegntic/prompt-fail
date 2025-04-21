import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_NAME) {
  throw new Error("Missing required database environment variables. Please set DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, and DB_NAME.");
}

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: parseInt(DB_PORT),
    dialect: 'postgres',
  }
);

export { sequelize };
