/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV_CONFIG } from './utils/envConfig';
import logger from './config/logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = 3150;
  await app.listen(port, '0.0.0.0', () => {
    logger.info(`Application running on port ${port}`);
    console.log(`Application running on port ${port}`);
  });
}
bootstrap();
