import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { EmailMarketerService } from './email-marketer.service';
import { json } from 'stream/consumers';

@Controller('email-marketer')
export class EmailMarketerController {
  constructor(private readonly emailMarketerService: EmailMarketerService) {}

  @Get('generate')
  async generateEmail(@Query('prompt') prompt: string) {
    try {
      if (!prompt) {
        throw new Error('Prompt is required');
      }
      const message =
        await this.emailMarketerService.generateEmailWithMastra(prompt);
      return {
        event_name: 'email_generated',
        message,
        status: 'success',
        username: 'mastraAiemailgen',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('integration-config')
  async getIntegrationConfig() {
    return {
      data: {
        date: {
          created_at: '2025-03-13',
          updated_at: '2025-03-13',
        },
        descriptions: {
          app_name: 'Email Marketer',
          app_description:
            'Email Marketer is a service that helps users create engaging marketing emails',
          app_logo: '',
          app_url: '',
          background_color: '#f0f0f0',
        },
        is_active: true,
        integration_type: 'modifier',
        integration_category: 'Monitoring & Logging',
        key_features: [
          'Create engaging marketing emails',
          'Help users create marketing emails',
          'Format emails with subject, body, and CTA',
        ],
        author: 'Oceans9',
        settings: [],
        target_url: '',
        tick_url: '',
      },
    };
  }
}
