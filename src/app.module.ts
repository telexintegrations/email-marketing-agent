/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailMarketerController } from './email-marketer/email-marketer.controller';
import { EmailMarketerModule } from './email-marketer/email-marketer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), EmailMarketerModule],
  controllers: [AppController, EmailMarketerController],
  providers: [AppService],
})

export class AppModule {}
