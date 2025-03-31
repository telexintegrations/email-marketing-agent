import { Controller, Post, Body } from '@nestjs/common';
import { ZohoMailService } from './zohoMailer.service';

@Controller('email')
export class ZohoMailController {
  constructor(private readonly zohoMailService: ZohoMailService) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
    return this.zohoMailService.sendMail(body.to, body.subject, body.text);
  }
}