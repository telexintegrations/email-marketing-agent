import { Injectable } from '@nestjs/common';
import { generateEmail } from 'src/utils/mastra/mastra-ai';

@Injectable()
export class EmailMarketerService {
  async generateEmailWithMastra(prompt: any): Promise<string> {
    const triggerWord = '@mailer ';
    if (!prompt || typeof prompt !== 'string') {
      console.log('prompt:', prompt);
      throw new Error('Prompt is required');
    }
    if (!prompt.startsWith(triggerWord)) return prompt;
    if (!prompt.includes(triggerWord)) return prompt;

    try {
      if (!prompt) {
        throw new Error('Prompt is required');
      }
      return generateEmail(prompt);
    } catch (error) {
      return error.message;
    }
  }
}
