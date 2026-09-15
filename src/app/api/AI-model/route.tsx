import { FINAL_PROMPT, PROMPT } from "@/components/data";
import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENAIROUTER_API_KEY
});

const MODELS = [
    "openrouter/free",
    "nvidia/nemotron-3-ultra-550b-a55b:free",
];

function getErrorStatus(error: unknown): number | undefined {
    return typeof error === 'object' && error !== null && 'status' in error
        ? (error as { status?: number }).status
        : undefined;
}

function isRetryableStatus(status: number | undefined): boolean {
    if (status === undefined) return true;
    if (status === 402 || status === 401 || status === 400) return false;
    return true;
}

function extractJsonFromResponse(content: string): unknown {
    const trimmed = content.trim();

    try {
        return JSON.parse(trimmed);
    } catch {
        // continue to the next strategy below
    }

    const codeBlockMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonCandidate = codeBlockMatch ? codeBlockMatch[1].trim() : trimmed;

    if (jsonCandidate !== trimmed) {
        try {
            return JSON.parse(jsonCandidate);
        } catch {
            // continue to the fallback below
        }
    }

    const jsonStart = jsonCandidate.indexOf('{');
    const jsonEnd = jsonCandidate.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd > jsonStart) {
        try {
            return JSON.parse(jsonCandidate.slice(jsonStart, jsonEnd + 1));
        } catch {
            // no more fallbacks
        }
    }

    console.warn(
        `[AI-model] Failed to parse as JSON. Length: ${trimmed.length}. Preview: ${trimmed.slice(0, 120)}`
    );
    throw new Error("AI response was not valid JSON");
}

export async function POST(req: NextRequest) {
    const { messages, viewTrip } = await req.json()

    let lastError: unknown = null;

    for (const model of MODELS) {
        try {
            const completion = await openai.chat.completions.create({
                model,
                max_tokens: viewTrip ? 4000 : 800,
                response_format: { type: 'json_object' },
                messages: [
                    {
                        role: 'system',
                        content: viewTrip ? FINAL_PROMPT : PROMPT
                    },
                    ...messages
                ],
            });

            const content = completion.choices[0].message.content;

            if (!content) {
                console.error(`[AI-model] ${model} returned empty content`);
                throw new Error("No content returned from AI");
            }

            try {
                const result = extractJsonFromResponse(content);
                // console.log(`[AI-model] Success with ${model}`);
                return NextResponse.json(result);
            } catch (parseError) {
                // console.error(`[AI-model] ${model} returned non-JSON content`, parseError);
                throw parseError;
            }
        } catch (error) {
            const status = getErrorStatus(error);
            // console.error(`[AI-model] ${model} failed`, { status }, error);

            if (!isRetryableStatus(status)) {
                lastError = error;
                break;
            }

            lastError = error;
        }
    }

    const status = getErrorStatus(lastError);

    if (status === 402) {
        return NextResponse.json(
            { error: 'Free tier balance exhausted. Add credits or top up at openrouter.ai to continue.' },
            { status: 402 }
        );
    }

    if (status === 429) {
        return NextResponse.json(
            { error: 'Free daily limit (50) reached — comes back tomorrow' },
            { status: 429 }
        );
    }

    return NextResponse.json(
        { error: status ? `AI request failed (${status})` : 'Failed to generate response' },
        { status: status ?? 500 }
    );
}