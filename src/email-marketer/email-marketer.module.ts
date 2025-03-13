import { Module } from '@nestjs/common';
import { EmailMarketerService } from './email-marketer.service';
import { EmailMarketerController } from './email-marketer.controller';

@Module({
  providers: [EmailMarketerService],
  controllers: [EmailMarketerController],
  exports: [EmailMarketerService],
})
export class EmailMarketerModule {}
