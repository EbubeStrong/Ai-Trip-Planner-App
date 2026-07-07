"use client"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader, Send } from "lucide-react";
import EmptyChatboxDisplayMessage from "./EmptyChatboxDisplay";
import { Message } from "@/types";



function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSend() {
        if (!userInput?.trim() || isLoading) return

        const newMessage: Message = {
            role: 'user',
            content: userInput
        }

        setMessages((prev: Message[]) => [...prev, newMessage])
        setUserInput('')
        setIsLoading(true)

        try {
            const response = await fetch("/api/AI-model", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // messages: message,
                    messages: [...messages, newMessage],
                }),
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            const result = await response.json();


            setMessages((prev: Message[]) => [...prev, {
                role: 'assistant',
                content: result?.res,
                ui: result?.ui
            }])
            // console.log(result, "result");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    const renderGeneratedUI = (ui: string) => {
        switch (ui) {
            case 'budget':
                // Budget UI Component
            break;
            case 'groupSize':
                // Group Size UI Component
            break;
        }
    }

    // fetch('https://openrouter.ai/api/v1/chat/completions', {
    //     method: 'POST',
    //     headers: {
    //         Authorization: 'Bearer <OPENROUTER_API_KEY>',
    //         'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
    //         'X-OpenRouter-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         model: '~openai/gpt-latest',
    //         messages: [
    //             {
    //                 role: 'user',
    //                 content: 'What is the meaning of life?',
    //             },
    //         ],
    //     }),
    // });

    return (
        <div className="h-[85vh] flex min-h-0 flex-col">
            {/* When messages are empty */}
            {messages?.length === 0 && 
            <EmptyChatboxDisplayMessage onSelectOption={(v: string) => {setUserInput(v)}}/>
            }
            {/* Display Message */}
            <section className="scrollbar-thin-smooth flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    message.role === 'user' ?
                        <div key={index} className="flex justify-end mt-2">
                            <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                                {message.content}
                            </div>
                        </div>
                        : (
                            <div key={index} className="flex justify-start mt-2">
                                <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                                    {message.content}
                                </div>
                            </div>
                        )
                ))}
                {isLoading && (
                    <div className="flex justify-start mt-2">
                        <Loader className="animate-spin" />
                    </div>
                )}
            </section>

            {/* User Input */}
            <section>
                {/* <div>Map and Trip plan</div> */}
                <div className="border rounded-2xl p-4 shadow lg:max-w-3xl mx-auto relative">
                    <Textarea
                        className="h-28 border-none bg-transparent focus-visible:ring-0 shadow-none resize-none"
                        placeholder="Create a trip for Lagos Nigeria from New York"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />

                    <Button disabled={!userInput.trim()} onClick={() => onSend()} className="absolute bottom-6 right-7" size={'icon'}><Send className="h-4 w-4" /></Button>
                </div>
            </section>
        </div>
    );
}

export default ChatBox;