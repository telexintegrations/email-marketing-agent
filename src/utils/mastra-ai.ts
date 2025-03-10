import { groq } from '@ai-sdk/groq';
import { Mastra } from '@mastra/core';

const mastra = new Mastra({ apiKey: process.env.GROQ_API_KEY });

export async function generateEmail(prompt: string) {
  const response = await mastra.generate({
    prompt,
    template: `Generate a structured marketing email with the following format:
      Subject: {subject}
      Body: {body}
      CTA: {cta}`,
  });
  return response.data;
}


import { groq } from '@ai-sdk/groq';
import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core/agent';

export const marketingAgent = new Agent{
    prompt,
    template: `Generate a structured marketing email with the following format:
      Subject: {subject}
      Body: {body}
      CTA: {cta}`,
      model: groq('llama3-groq-70b-8192-tool-use-preview'),  
}