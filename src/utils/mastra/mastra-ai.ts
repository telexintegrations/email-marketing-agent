import { Mastra } from 'mastra';

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