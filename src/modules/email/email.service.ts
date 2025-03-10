import { Injectable } from '@nestjs/common';
import { generateEmail } from '../../utils/mastra-ai';
import { EmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  async createEmail(emailDto: EmailDto) {
    const email = await generateEmail(emailDto.prompt);
    return {
      subject: email.subject,
      body: email.body,
      cta: email.cta,
    };
  }
}