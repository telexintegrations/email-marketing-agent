import { Module } from '@nestjs/common';
import { ZohoMailService } from './zohoMailer.service';
import { ZohoMailController } from './zohoMailer.controller';

@Module({
  providers: [ZohoMailService],
  controllers: [ZohoMailController],
  exports: [ZohoMailService],
})
export class ZohoMailModule {}
