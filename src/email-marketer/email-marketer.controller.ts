import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { EmailMarketerService } from './email-marketer.service';

@Controller('email-marketer')
export class EmailMarketerController {
  constructor(private readonly emailMarketerService: EmailMarketerService) {}

  @Post('generate')
  async sendEmail(@Body() body: any) {
    console.log('Received request body:', body);

    try {
      if (!body.prompt || !body.message) {
        throw new Error('Prompt is required');
      }

      if (!body.settings || !body.settings.webhook_url) {
        throw new Error('Webhook URL is required');
      }

      const webhookUrl = body.settings.webhook_url;

      const message = await this.emailMarketerService.generateEmailWithMastra(
        body.message,
      );

      console.log('Calling sendGeneratedEmailToTelex with message:', message);
      await this.emailMarketerService.sendGeneratedEmailToTelex(
        message,
        webhookUrl,
      );

      return { message: 'Email successfully sent to Telex' };
    } catch (error) {
      console.log('Error in sendEmail controller:', error);
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
          app_url: 'https://mastraaiemailagent.onrender.com/',
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
          'https://mastraaiemailagent.onrender.com/email-marketer/generate',
        tick_url:
          'https://mastraaiemailagent.onrender.com/email-marketer/generate/integration-config',
      },
    };
  }
}
