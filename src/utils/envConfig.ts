import * as dotenv from 'dotenv';

dotenv.config();

export const ENV_CONFIG = {
  PORT: Number(process.env.PORT || 3000),
  SERVER_URL: process.env.SERVER_URL,
  GROQ_AI_API_KEY: process.env.GROQ_AI_API_KEY,
};
