/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV_CONFIG } from './utils/envConfig';
import logger from './config/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = ENV_CONFIG.PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    logger.info(`Application running on port ${port}`);
  });
}
bootstrap();
