/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV_CONFIG } from './utils/envConfig';
import logger from './config/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(ENV_CONFIG.PORT, () => {
    logger.info(`Application running on port ${ENV_CONFIG.PORT}`);
  });
}
bootstrap();
