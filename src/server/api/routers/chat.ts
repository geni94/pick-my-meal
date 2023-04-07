// make a request to openai to get a response
import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_KEY,
  })
);

export const GenerateChat = async (query: string, premium = false) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: query,
    temperature: 0.9,
    max_tokens: premium ? 512 : 256,
  });
  if (!response || typeof response === undefined) return "";
  if (!("data" in response && "choices" in response.data)) return "";
  const choice = response.data?.choices[0];
  return choice?.text ?? "";
};

export const chatRouter = createTRPCRouter({
  generateChat: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const { query } = input;
      const response = await GenerateChat(query);
      return response;
    }),
  premiumGenerateChat: privateProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const { query } = input;
      const response = await GenerateChat(query, true);
      return response;
    }),
});
