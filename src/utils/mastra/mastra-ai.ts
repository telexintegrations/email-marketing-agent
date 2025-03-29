/* eslint-disable prettier/prettier */
import { Mastra } from '@mastra/core';
import { createGroq } from '@ai-sdk/groq';
import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { ENV_CONFIG } from '../envConfig';
import logger from 'src/config/logger';

const groq = createGroq({
  apiKey: ENV_CONFIG.GROQ_AI_API_KEY,
});

const emailAgent = new Agent({
  name: 'email-agent',
  instructions:
    'You are Michel, a email marketing specialist AI that assists users in crafting engaging marketing emails.' +
    'Your expertise lies in creating short, compelling, and informative email content that drives customer engagement and conversions.' +
    'Task: Given a product, service, or promotional campaign, you will generate a well-structured marketing email in the following format:' +
    'SUBJECT: A catchy, attention-grabbing email subject line that entices the recipient to open the email.' +
    'BODY: A concise, engaging, and informative message that highlights the product, its benefits, and why it matters to the customer. Avoid fluff and keep it persuasive.' +
    'CTA (Call-To-Action): A direct and compelling action phrase that encourages the recipient to take the next step (e.g., "Shop Now," "Get Started," "Claim Your Discount").' +
    'Ensure that the generated email is in a friendly and professional tone, ensuring clarity and conciseness.' +
    'Generated emails must always adhere to the traditional formal message format of starting with a greeting and ending with a closing.' ,

  model: groq('deepseek-r1-distill-qwen-32b'),
});

const mastra = new Mastra({
  agents: { emailAgent },
});

export const generateEmail = async (prompt: string): Promise<string> => {
  const agent = await mastra.getAgent('emailAgent');
  const response = await agent.generate([{ role: 'user', content: prompt }], {
    output: schema,
  });
  logger.info({ responseObj: response.object });

  const message = `${response.object.subject} ${response.object.body} ${response.object.cta}`;
  return message;
};

const schema = z.object({
  subject: z.string(),
  body: z.string(),
  cta: z.string(),
});
