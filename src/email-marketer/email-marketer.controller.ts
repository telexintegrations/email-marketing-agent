import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { EmailMarketerService } from './email-marketer.service';
import { ENV_CONFIG } from "../utils/envConfig";
import logger from 'src/config/logger';

@Controller('email-marketer')
export class EmailMarketerController {
  constructor(private readonly emailMarketerService: EmailMarketerService) {}

  @Post('generate')
  async sendEmail(@Body() body: any) {
    logger.info('Received request body:', { body });

    try {
      if (!body.prompt && !body.message) {
        throw new Error('Prompt is required');
      }

      const webhookUrl = body.settings.find(
        (s: any) => s.label === 'webhook_url',
      ).default;

      if (!body.settings || !webhookUrl) {
        throw new Error('Webhook URL is required');
      }

      const message = await this.emailMarketerService.generateEmailWithMastra(
        body.message,
      );

      logger.info('Calling sendGeneratedEmailToTelex with message:', {
        message,
      });
      await this.emailMarketerService.sendGeneratedEmailToTelex(
        message,
        webhookUrl,
      );

      return { message: 'Email successfully sent to Telex' };
    } catch (error) {
      logger.error('Error in sendEmail controller:', { error });
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('integration-config')
  async getIntegrationConfig() {
    return {
      data: {
        date: {
          created_at: '2025-03-12',
          updated_at: '2025-03-13',
        },
        descriptions: {
          app_name: 'Email Marketing Agent',
          app_description:
            'An AI-powered email marketing agent designed to generate engaging and personalized marketing emails',
          app_logo: 'https://cdn-icons-png.flaticon.com/512/7286/7286142.png',
          app_url: ENV_CONFIG.SERVER_URL,
          background_color: '#fff',
        },
        is_active: true,
        integration_type: 'modifier',
        integration_category: 'Marketing Automation',
        key_features: ['Email Generation', 'Prompt Response', 'AI-Powered'],
        author: 'Tempah, Diligwe, Jay',
        settings: [
          {
            label: 'Duration',
            type: 'number',
            required: true,
            default: '10',
          },
          {
            label: 'webhook_url',
            type: 'text',
            required: true,
            default: 'Write your webhook url here',
          },
        ],
        target_url:
          `${ENV_CONFIG.SERVER_URL}/email-marketer/generate`,
        tick_url:
          `${ENV_CONFIG.SERVER_URL}/email-marketer/generate/integration-config`,
      },
    };
  }
}
