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
    const body = reqBody;
    logger.info(`Received request body => ${JSON.stringify(body)}`);

    // console.log(JSON.stringify({ body: body }));
    logger.info({ message: body.message });
    try {
      if (!body.message) {
        throw new Error('Prompt is required');
      }

      // const webhookUrl = body.settings.find(
      //   (s: any) => s.label === 'webhook_url',
      // ).default;

      // if (!body.settings || !webhookUrl) {
      //   throw new Error('Webhook URL is required');
      // }

      const webhookUrl = '0195ab80-a186-75cf-97d2-1efff827ba2e';

      const message = await this.emailMarketerService.generateEmailWithMastra(
        body.message,
      );

      logger.info(
        `Calling sendGeneratedEmailToTelex with message => ${message}`,
      );

      await this.emailMarketerService.sendGeneratedEmailToTelex(
        message,
        webhookUrl,
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
          app_url: 'https://mastraaiemailagent.onrender.com',
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
        target_url: `https://mastraaiemailagent.onrender.com/email-marketer/generate`,
        tick_url: `https://mastraaiemailagent.onrender.com/email-marketer/generate/integration-config`,
      },
    };
  }

  // @Get('integration-config')
  // async getIntegrationConfig() {
  //   console.log(`Integration Config`);

  //   return {
  //     data: {
  //       date: {
  //         created_at: '2025-03-12',
  //         updated_at: '2025-03-13',
  //       },
  //       descriptions: {
  //         app_name: 'Email Marketing Agent',
  //         app_description:
  //           'An AI-powered email marketing agent designed to generate engaging and personalized marketing emails',
  //         app_logo: 'https://img.icons8.com/nolan/64/slack-new.png',
  //         app_url: 'https://6dw8m2pj-3150.uks1.devtunnels.ms',
  //         background_color: '#fff',
  //       },
  //       is_active: true,
  //       integration_type: 'modifier',
  //       integration_category: 'Marketing Automation',
  //       key_features: ['Email Generation', 'Prompt Response', 'AI-Powered'],
  //       author: 'Diligwe',
  //       settings: [
  //         {
  //           label: 'Duration',
  //           type: 'number',
  //           required: true,
  //           default: '10',
  //         },
  //       ],
  //       target_url: `https://6dw8m2pj-3150.uks1.devtunnels.ms/email-marketer/generate`,
  //       tick_url: `https://6dw8m2pj-3150.uks1.devtunnels.ms/email-marketer/integration-config`,
  //     },
  //   };
  // }
}
