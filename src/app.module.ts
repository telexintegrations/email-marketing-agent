/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailMarketerController } from './email-marketer/email-marketer.controller';
import { EmailMarketerModule } from './email-marketer/email-marketer.module';
import { ConfigModule } from '@nestjs/config';
import { ZohoMailModule } from './utils/zohoMail/zohoMailer.module';
import { ZohoMailController } from './utils/zohoMail/zohoMailer.controller';

@Module({
  imports: [ConfigModule.forRoot(), EmailMarketerModule, ZohoMailModule],
  controllers: [AppController, EmailMarketerController, ZohoMailController],
  providers: [AppService],
})
export class AppModule {}
