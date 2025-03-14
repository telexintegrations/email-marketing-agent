/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import cors from 'cors';
=======
import * as dotenv from 'dotenv';

dotenv.config();
>>>>>>> 3569cf90bf5b48fdf0e8daa338e0e93baa19a3b4

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cors());
  
  await app.listen(process.env.PORT);
}
bootstrap();
