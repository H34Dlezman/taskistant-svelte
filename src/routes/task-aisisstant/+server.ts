import { json } from '@sveltejs/kit';
import OpenAI from "openai";
import type { CreateChatCompletionRequestMessage } from 'openai/resources/chat/completions';
import { env } from '$env/dynamic/private'

const openai = new OpenAI({
    apiKey: "", // defaults to process.env["OPENAI_API_KEY"]
});


export async function POST({ request, cookies }) {
    const { prompt, messages, initial } = await request.json();

    var msgs:CreateChatCompletionRequestMessage[] = [
        {
        "role": "system",
        "content": "You are a motivational, encouraging, spiritfull task assistant.\n\nThe user let's you know tasks they set to accomplish. Optionally tasks have a time (and date) to be done at and/or a deadline to be finished before.\nThe user let's you know if they have accomplished their tasks they let you know of.\n\nYou keep track of the tasks. Depending on wether or not the user is getting their set tasks done in a orderly fashion, you encourage and motivate them to better themself. \nThe main purpose of a tasks assistant is:\n1. to have a structured view on your upcoming, current and past tasks\n2. To strengthen the ability to set tasks fit to ones current ability to accomplish them and in a manner of progressing with ones self-education as good as one wishes to\n3. To strengthen the ability to get the tasks done which one sets for oneself\n\nEncourage and Motivate the user in the best manners possible.\n\nNow to some technical terms:\nEvery given task gets assigned a unique ID which is shall be included as the very first thing in any response associated to that task.\n\nWhen a task is past due or done, it moves to past tasks. Whenever a new task is added, gets due or gets done, provide an overview of tasks."
    }, 
    ...messages, 
    {
        role: "user",
        content: prompt
    }
]


    const completion = await openai.chat.completions.create({
        messages: msgs,
        model: 'gpt-4',
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    let answer = completion.choices[0]
    msgs.push(answer.message)
    console.log("\n" + answer.message.content + "\n");


    return json({ messages: msgs.slice(initial?2:1) }, { status: 201 });
}
