import { Mastra } from '@mastra/core';
import { groq } from '@ai-sdk/groq';
import { Agent } from '@mastra/core/agent';
import { Schema, z } from 'zod';

const emailAgent = new Agent({
  name: "email-agent",
  instructions: 
  "You are Michel, a marketing specialist who helps users create engaging marketing emails" +
  "You help people create these emails with whatever product they are trying to sell to their customers" +
  "the format of your emails is short, engaging, informative and should only be SUBJECT, BODY of the mail and CTA",

  model: groq('deepseek-r1-distill-qwen-32b')
});

const mastra = new Mastra({
  agents: {emailAgent}
})

export const generateEmail = async (prompt: string): Promise<string> => {
  const agent = await mastra.getAgent("emailAgent");
  const response = await agent.generate(
    [{role: 'user', content: prompt}],
    {output: schema}
  );
  console.log(response.object)
  return `${response.object.subject} ${response.object.body} ${response.object.cta}`;
}

const schema = z.object({
  subject: z.string(),
  body: z.string(),
  cta: z.string()
});
