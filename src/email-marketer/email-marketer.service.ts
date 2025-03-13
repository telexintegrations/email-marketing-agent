import { Injectable } from '@nestjs/common';
import { generateEmail } from 'src/utils/mastra/mastra-ai';

@Injectable()
export class EmailMarketerService {
  async generateEmailWithMastra(prompt: string) {
    const triggerWord = '@mailer ';
    //check if the triggerword is present as the first word of the sentece
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
