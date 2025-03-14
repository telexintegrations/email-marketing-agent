import { Injectable } from '@nestjs/common';
import { generateEmail } from 'src/utils/mastra/mastra-ai';

@Injectable()
export class EmailMarketerService {
  async generateEmailWithMastra(prompt: any): Promise<string> {
    const triggerWord = '@mailer ';
    while (
      typeof prompt === 'object' &&
      prompt !== null &&
      'prompt' in prompt
    ) {
      prompt = prompt.prompt;
    }

    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt: must be a non-empty string');
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
