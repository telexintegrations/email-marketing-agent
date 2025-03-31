import { Injectable } from '@nestjs/common';
import logger from 'src/config/logger';
import * as nodemailer from 'nodemailer';
import { EmailGeneration } from 'src/utils/inferredTypes';
import { generateEmail } from 'src/utils/mastra/mastra-ai';
import { ENV_CONFIG } from 'src/utils/envConfig';

@Injectable()
export class EmailMarketerService {
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

  async generateEmailWithMastra(prompt: any): Promise<string> {
    const triggerWord = '@mailer ';

    // Recursively extract the actual string from nested objects
    while (typeof prompt === 'object' && prompt !== null) {
      logger.info(`while loop: `, { prompt });
      if ('message' in prompt) {
        logger.info(`while loop message: `, { prompt });
        prompt = prompt.message.toString();
      } else if ('prompt' in prompt) {
        logger.info(`while loop prompt: `, { prompt });
        prompt = prompt.prompt.toString();
      } else {
        break;
      }
    }

    prompt = prompt.replace(/<\/?[^>]+(>|$)/g, '');

    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt: must be a non-empty string');
    }
    logger.info('Extracted prompt:', { prompt });

    // Ensure @mailer is at the beginning
    if (!prompt.startsWith(triggerWord)) {
      logger.info('invalid prompt');
      return;
    }

    try {
      return await generateEmail(prompt);
    } catch (error) {
      return error.message;
    }
  }

  async sendGeneratedEmailToTelex(email: string, channelId: string) {
    const url = `https://ping.telex.im/v1/webhooks/${channelId}`;
    logger.info('Sending email to Telex:', { email });

    const data = {
      event_name: 'email_generated',
      message: email,
      status: 'success',
      username: 'mastraAiemailgen',
    } as EmailGeneration;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 202) {
        logger.info('Telex accepted the request, processing in progress...');
      } else if (!response.ok) {
        logger.info(
          `Telex responded with an error: ${response.status} ${response.statusText}`,
        );
      } else {
        logger.info('Email successfully sent to Telex.');
      }
      return response;
    } catch (error) {
      logger.error('Error sending email to Telex:', error);
    }
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
