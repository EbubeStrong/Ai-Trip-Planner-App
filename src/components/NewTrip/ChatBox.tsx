"use client"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Loader, Send } from "lucide-react";
import EmptyChatboxDisplayMessage from "./EmptyChatboxDisplay";
import { Message, TripPlanProps } from "@/types";
import { ChatBoxBudgetUI, ChatBoxFinalUI, ChatBoxGroupSizeUI, ChatBoxTravelDaysUI } from "./UIChatbox";
// import ChatBoxGroupSizeUI from "./GroupSizeUI";


function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tripDetail, setTripDetail] = useState<TripPlanProps | null>(null)

    const lastUi = messages[messages.length - 1]?.ui;
    const viewTrip = lastUi === "viewTrip" || lastUi === "final";

    async function onSend(input?: string) {
        const messageToSend = input ?? userInput;

        if (!messageToSend.trim() || isLoading) return;

        const newMessage: Message = {
            role: "user",
            content: messageToSend,
        };

        const currentMessages = [...messages, newMessage];

        setMessages(prev => [...prev, newMessage]);
        setUserInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/AI-model", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: currentMessages,
                    viewTrip,
                }),
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            const result = await response.json();
            console.log("TRIP", result)


            const ui = result.ui || "final";

            const assistantMessage: Message = {
                role: "assistant",
                content: result.res,
                ui,
            };

            setMessages(prev => [...prev, assistantMessage]);

            // Trip is complete.
            if (ui === "final" || ui === "viewTrip") {
                // Show your trip UI here if needed.
                return setUserInput("Ok, Great!"), setTripDetail(result?.trip_plan);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
    }
};

    const renderGeneratedUI = (ui: string) => {
        switch (ui) {
            case 'budget':
                return <ChatBoxBudgetUI onSelectedBudgetOption={(v: string) => { setUserInput(v); onSend(v) }} />
                // Budget UI Component
                break;
            case 'groupSize':
                // Group Size UI Component
                return <ChatBoxGroupSizeUI onSelectedOption={(v: string) => { setUserInput(v); onSend(v) }} />;
            // break;
            case "tripDuration":
                return (
                    <ChatBoxTravelDaysUI
                        ChatBoxSelectedTravelDayOption={(days: number) => {
                            const value = `${days} day${days > 1 ? "s" : ""}`;

                            setUserInput(value);
                            onSend(value);
                        }}
                    />
                );
            // case 'final':
            case 'viewTrip':
                // Final UI for View Trip Component
                return <ChatBoxFinalUI disableBtn={!tripDetail} onSelectedViewTripOption={(v: string) => { setUserInput(v); onSend(v) }} />;
            // break;
            default:
                return null; // Default case if no matching UI is found
        }
    }

    // useEffect(() => {
    //     if (viewTrip) {
    //     setUserInput("Ok, Great!");
    //     onSend();
    // }
    // }, [viewTrip]);



    return (
        <div className="h-[85vh] w-full flex min-h-0 flex-col">
            {/* When messages are empty */}
            {messages?.length === 0 &&
                <EmptyChatboxDisplayMessage onSelectOption={(v: string) => { setUserInput(v) }} />
            }
            {/* Display Message */}
            <section className="scrollbar-thin-smooth flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    message.role === 'user' ?
                        <div key={index} className="flex justify-end mt-2">
                            <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                                {/* user message content */}
                                {message.content}
                            </div>
                        </div>
                        : (
                            <div key={index} className="flex justify-start mt-2">
                                <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                                    {/* ai message content */}
                                    {message.content}
                                    {/* Render generated UI based on the 'ui' property */}
                                    {message?.ui && renderGeneratedUI(message?.ui)}
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
                        onKeyDown={handleKeyDown}
                    />

                    <Button disabled={!userInput.trim()} onClick={() => onSend()} className="absolute bottom-6 right-7" size={'icon'}><Send className="h-4 w-4" /></Button>
                </div>
            </section>
        </div>
    );
}

export default ChatBox;