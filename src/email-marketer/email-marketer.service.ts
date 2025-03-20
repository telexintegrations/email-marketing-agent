import { Injectable } from '@nestjs/common';
import { EmailGeneration } from 'src/utils/inferredTypes';
import { generateEmail } from 'src/utils/mastra/mastra-ai';

@Injectable()
export class EmailMarketerService {
  async generateEmailWithMastra(prompt: any): Promise<string> {
    const triggerWord = '@mailer ';

    // Recursively extract the actual string from nested objects
    while (typeof prompt === 'object' && prompt !== null) {
      if ('message' in prompt) {
        prompt = prompt.message.toString();
        
      } else if ('prompt' in prompt) {
        prompt = prompt.prompt.toString();
      } else {
        break;
      }
    }

    prompt = prompt.replace(/<\/?[^>]+(>|$)/g, '');

    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt: must be a non-empty string');
    }
    console.log('Extracted prompt:', prompt);

    // Ensure @mailer is at the beginning
    if (!prompt.startsWith(triggerWord)) return prompt;

    try {
      return await generateEmail(prompt);
    } catch (error) {
      return error.message;
    }
  }

  async sendGeneratedEmailToTelex(email: string, webhook_url: string) {
    const url = `https://ping.telex.im/v1/webhooks/${webhook_url}`;
    console.log('Sending email to Telex:', email);

    const data = {
      event_name: 'email_generated',
      message: email,
      status: 'success',
      username: 'mastraAiemailgen',
    } as EmailGeneration;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 202) {
        console.log('Telex accepted the request, processing in progress...');
      } else if (!response.ok) {
        console.log(
          `Telex responded with an error: ${response.status} ${response.statusText}`,
        );
      } else {
        console.log('Email successfully sent to Telex.');
      }
      return response;
    } catch (error) {
      console.error('Error sending email to Telex:', error);
    }
  }
}
