"use client"
import ChatBox from "@/components/NewTrip/ChatBoxContent/ChatBox";
import { Itinerary } from "@/components/NewTrip/Itinerary/Itinerary";
import { ChatProvider, useChatContext } from "@/context/ChatContext";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Globe, MessageCircle, Plane } from "lucide-react";
import { useState } from "react";
import GlobalMap from "@/components/NewTrip/Map/globalMap";
import { Button } from "@/components/ui/button";

function PageInner() {
    const { viewTrip } = useChatContext();
    const [mobileChatOpen, setMobileChatOpen] = useState(false);
    const [chatDismissed, setChatDismissed] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <>
            <div className="grid mt-7 min-h-0 grid-cols-1 gap-5 p-4 md:p-7 lg:fixed lg:inset-0 lg:grid-cols-3 lg:overflow-hidden no-scrollbar">
                <div className={`${viewTrip && chatDismissed ? "hidden" : ""} col-span-1 lg:block`}>
                    <ChatBox onMobileDismiss={() => setChatDismissed(true)} />
                </div>

                <div className={`${!viewTrip || (viewTrip && !chatDismissed) ? "hidden" : ""} col-span-2 lg:block relative`}>
                    {activeIndex === 0 ? <Itinerary /> : <GlobalMap/>}

                    <Button size="icon" className="absolute bottom-20 left-[50%] z-20 cursor-pointer" onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}>
                        {activeIndex === 0 ? <Plane /> : <Globe />}
                    </Button>
                </div>
            </div>

            {viewTrip && chatDismissed && (
                <div className="fixed bottom-6 right-6 z-50 lg:hidden">
                    <Dialog open={mobileChatOpen} onOpenChange={setMobileChatOpen}>
                        <DialogTrigger render={<button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg" />}>
                            <MessageCircle className="h-7 w-7" />
                        </DialogTrigger>
                        <DialogContent className="max-w-[calc(100%-1rem)] sm:max-w-lg p-0 rounded-xl">
                            <div className="h-screen w-full">
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
