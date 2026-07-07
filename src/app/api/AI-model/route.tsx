import { PROMPT } from "@/components/data";
import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENAIROUTER_API_KEY
});

export async function POST(req: NextRequest) {
    const { messages } = await req.json()

    try {
        const completion = await openai.chat.completions.create({
            // model: '~openai/gpt-latest',
            model: "openai/gpt-4o-mini",
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: PROMPT
                },
                ...messages
            ],
        });

        // console.log(completion.choices[0].message);
        const message = completion.choices[0].message

        // return NextResponse.json(JSON.parse(message.content ?? ''))
        const content = message.content;

        if (!content) {
            return NextResponse.json(
                { error: "No content returned from AI" },
                { status: 500 }
            );
        }

        return NextResponse.json(JSON.parse(content));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 }),
            console.error('Error generating response:', error)
    }
}