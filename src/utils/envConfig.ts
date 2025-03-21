import * as dotenv from 'dotenv';

dotenv.config();

export const ENV_CONFIG = {
  PORT: Number(process.env.PORT || 3000),
  SERVER_URL: process.env.SERVER_URL || "http://localhost:3000",
};
