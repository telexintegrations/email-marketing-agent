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

  async sendGeneratedEmailToTelex(email: string) {
    console.log('Sending email to Telex:', email);
    const data = {
      event_name: 'email_generated',
      message: email,
      status: 'success',
      username: 'mastraAiemailgen',
    } as EmailGeneration;
    try {
      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log('Error sending email to Telex:', error);
    }
  }
}
