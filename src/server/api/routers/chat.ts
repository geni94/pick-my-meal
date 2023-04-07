// make a request to openai to get a response
import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import { createTRPCRouter, publicProcedure } from '../trpc';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: "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",
  })
);

export const GenerateChat = async (query: string) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: query,
    temperature: 0.7,
    max_tokens: 256,
  });
  if (!response || typeof response === undefined) return "";
  if (!("data" in response && "choices" in response.data)) return "";
  return typeof response !== undefined ? response.data?.choices[0].text : "";
};

export const chatRouter = createTRPCRouter({
  generateChat: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const { query } = input;
      const response = await GenerateChat(query);
      return response;
    }),
});
