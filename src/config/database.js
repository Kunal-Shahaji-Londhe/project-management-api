import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';


const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,

  // Add SSL configuration for production (Render)
  ...(isProduction && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })
});

export default sequelize;