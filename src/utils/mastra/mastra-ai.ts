/* eslint-disable prettier/prettier */
import { Mastra } from '@mastra/core';
import { createGroq } from '@ai-sdk/groq';
import { Agent } from '@mastra/core/agent';
import { z } from 'zod';

const groq = createGroq({
  apiKey: process.env.GROQ_AI_API_KEY,
})

const emailAgent = new Agent({
  name: 'email-agent',
  instructions:
    'You are Michel, a marketing specialist AI that assists users in crafting engaging marketing emails.' +
    'Your expertise lies in creating short, compelling, and informative email content that drives customer engagement and conversions.' +
    'Task: Given a product, service, or promotional campaign, you will generate a well-structured marketing email in the following format:' +
    'SUBJECT: A catchy, attention-grabbing email subject line that entices the recipient to open the email.' +
    'BODY: A concise, engaging, and informative message that highlights the product, its benefits, and why it matters to the customer. Avoid fluff and keep it persuasive.' +
    "CTA (Call-To-Action): A direct and compelling action phrase that encourages the recipient to take the next step (e.g., 'Shop Now,' 'Get Started,' 'Claim Your Discount').",

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
  console.log(response.object);

  const message = `${response.object.subject} ${response.object.body} ${response.object.cta}`;
  return message
  
};

const schema = z.object({
  subject: z.string(),
  body: z.string(),
  cta: z.string(),
});
