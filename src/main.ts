/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import cors from 'cors';

const app = express()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cors());
  
  await app.listen(process.env.PORT);
}
bootstrap();
