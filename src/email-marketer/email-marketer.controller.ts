import { Controller, Get, Query } from '@nestjs/common';
import { EmailMarketerService } from './email-marketer.service';

@Controller('email-marketer')
export class EmailMarketerController {
  constructor(private readonly emailMarketerService: EmailMarketerService) {}

  @Get('generate')
  async generateEmail(@Query('prompt') prompt: string) {
    try {
      if (!prompt) {
        throw new Error('Prompt is required');
      }
      return this.emailMarketerService.generateEmailWithMastra(prompt);
    } catch (error) {
      return error.message;
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
