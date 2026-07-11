"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { Message, TripPlanProps } from "@/types";

interface ChatContextType {
  messages: Message[];
  setMessages: (msgs: Message[] | ((prev: Message[]) => Message[])) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  tripDetail: TripPlanProps | null;
  setTripDetail: (detail: TripPlanProps | null) => void;
  userInput: string;
  setUserInput: (input: string) => void;
  viewTrip: boolean;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripPlanProps | null>(null);
  const [userInput, setUserInput] = useState("");

  const lastUi = messages[messages.length - 1]?.ui;
  const viewTrip = lastUi === "viewTrip" || lastUi === "final";

  return (
    <ChatContext.Provider
      value={{
        messages, setMessages,
        isLoading, setIsLoading,
        tripDetail, setTripDetail,
        userInput, setUserInput,
        viewTrip,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}
