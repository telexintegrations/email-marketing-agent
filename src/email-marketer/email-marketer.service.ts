import { Injectable } from '@nestjs/common';
import { EmailGeneration } from 'src/utils/inferredTypes';
import { generateEmail } from 'src/utils/mastra/mastra-ai';

@Injectable()
export class EmailMarketerService {
  url =
    'https://ping.telex.im/v1/webhooks/0195932a-d682-7898-ba9e-8762177eba3a';
  async generateEmailWithMastra(prompt: any): Promise<string> {
    const triggerWord = '@mailer ';

    // Recursively extract the actual string from nested objects
    while (typeof prompt === 'object' && prompt !== null) {
      if ('prompt' in prompt) {
        prompt = prompt.prompt;
      } else if ('message' in prompt) {
        prompt = prompt.message.toString();
        prompt = prompt.replace(/<\/?[^>]+(>|$)/g, '');
      } else {
        break;
      }
    }

    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt: must be a non-empty string');
    }
    console.log('Extracted prompt:', prompt);

    // Ensure @mailer is at the beginning
    if (!prompt.startsWith(triggerWord)) return prompt;
    if (!prompt.includes(triggerWord)) return prompt;

    try {
      return await generateEmail(prompt);
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
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('Email sent to Telex', response);
      return response;
    } catch (error) {
      console.log('Error sending email to Telex:', error);
    }
  }
}
