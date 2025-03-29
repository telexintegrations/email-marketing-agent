import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { EmailMarketerService } from './email-marketer.service';
import { ENV_CONFIG } from '../utils/envConfig';
import logger from 'src/config/logger';
import { ReqPayloadDto } from './dto/req-payload.dto';

@Controller('email-marketer')
export class EmailMarketerController {
  constructor(private readonly emailMarketerService: EmailMarketerService) {}

  @Post('generate')
  async sendEmail(@Body() reqBody: ReqPayloadDto) {
    try {
      logger.info(`Received request body => ${JSON.stringify(reqBody)}`);

      if (!reqBody.message) {
        throw new Error('Prompt is required');
      }

      const channelId = reqBody.channel_id;

      const message = await this.emailMarketerService.generateEmailWithMastra(
        reqBody.message,
      );

      logger.info(
        `Calling sendGeneratedEmailToTelex with message => ${message}`,
      );

      await this.emailMarketerService.sendGeneratedEmailToTelex(
        message,
        channelId,
      );

      return { message: 'Email successfully sent to Telex' };
    } catch (error) {
      logger.error(`Error in sendEmail controller => ${error}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('integration-config')
  async getIntegrationConfig() {
    logger.info(`Integration Config`);

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
        ],
        target_url: `${ENV_CONFIG.SERVER_URL}/email-marketer/generate`,
        tick_url: `${ENV_CONFIG.SERVER_URL}/email-marketer/generate/integration-config`,
      },
    };
  }
}
