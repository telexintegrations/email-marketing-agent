import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import logger from 'src/config/logger';
import { ENV_CONFIG } from '../envConfig';

@Injectable()
export class ZohoMailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'smtp.zoho.com',
      auth: {
        user: `${ENV_CONFIG.EMAIL_USER}`,
        pass: `${ENV_CONFIG.EMAIL_PASS}`,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: `${ENV_CONFIG.EMAIL_USER}`,
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info('Email sent: ', info.messageId);
      return info;
    } catch (error) {
      logger.error('Error sending email:', error);
      throw error;
    }
  }
}