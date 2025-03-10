import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('generate')
  async generate(@Body() emailDto: EmailDto) {
    return this.emailService.createEmail(emailDto);
  }
}