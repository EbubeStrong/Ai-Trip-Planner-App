"use client"
import ChatBox from "@/components/NewTrip/ChatBoxContent/ChatBox";
import { Itinerary } from "@/components/NewTrip/Itinerary/Itinerary";
import { ChatProvider, useChatContext } from "@/context/ChatContext";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

function PageInner() {
    const { viewTrip } = useChatContext();
    const [mobileChatOpen, setMobileChatOpen] = useState(false);

    return (
        <>
            <div className="grid min-h-0 grid-cols-1 gap-5 p-4 md:p-10 lg:grid-cols-3">
                <div className={viewTrip ? "hidden lg:block " : "lg:block"}>
                    <ChatBox />
                </div>

                <div className={!viewTrip ? "hidden col-span-2 lg:block " : "lg:block col-span-2"}>
                    <Itinerary />
                </div>
            </div>

            {viewTrip && (
                <div className="fixed bottom-6 right-6 z-50 lg:hidden">
                    <Dialog open={mobileChatOpen} onOpenChange={setMobileChatOpen}>
                        <DialogTrigger render={<button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg" />}>
                            <MessageCircle className="h-7 w-7" />
                        </DialogTrigger>
                        <DialogContent className="max-w-[calc(100%-1rem)] sm:max-w-lg p-0 rounded-xl">
                            <div className="h-[80vh] w-full">
                                <ChatBox />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </>
    );
}

function CreateNewTripPage() {
    return (
        <ChatProvider>
            <PageInner />
        </ChatProvider>
    );
}

export default CreateNewTripPage;
