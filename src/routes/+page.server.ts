import OpenAI from "openai";
import type { CreateChatCompletionRequestMessage } from 'openai/resources/chat/completions';

const openai = new OpenAI({
    apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});



/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {

    return {
    };
  }

