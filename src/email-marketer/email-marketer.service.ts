import { Injectable } from '@nestjs/common';
import { generateEmail } from 'src/utils/mastra/mastra-ai';

@Injectable()
export class EmailMarketerService {
  async generateEmailWithMastra(prompt: any): Promise<string> {
    const triggerWord = '@mailer ';

    // Recursively extract the actual string from nested objects
    while (typeof prompt === 'object' && prompt !== null) {
      if ('prompt' in prompt) {
        prompt = prompt.prompt;
      } else if ('message' in prompt) {
        prompt = prompt.message.toString();
      } else {
        break;
      }
    }

    // Ensure prompt is a valid string
    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt: must be a non-empty string');
    }
    prompt = prompt.replace(/<\/?[^>]+(>|$)/g, '');
    console.log('Extracted prompt:', prompt);

    // Ensure @mailer is at the beginning
    if (!prompt.startsWith(triggerWord)) return prompt;

    try {
      return generateEmail(prompt);
    } catch (error) {
      return error.message;
    }
  }
}
