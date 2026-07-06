"use client";
import { ArrowDown, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { HeroVideoDialog } from "../ui/hero-video-dialog";
import { useUser } from "@clerk/nextjs";
import { suggestions } from "../data";
import { useRouter } from "next/navigation";
import { useState } from "react";


function Hero() {
    const { user } = useUser();
    const router = useRouter();
    const [message, setMessage] = useState<string>("");

    function onSend() {
        if (!message.trim()) return; // Prevent sending if the message is empty 
        if (user) {
            console.log("User is signed in");
        } else {
            router.push("/sign-in");
        }
    }
    return (
        <section className="mt-24 w-full flex justify-center">
            {/* Content */}
            <div className="max-w-3xl w-full mx-auto text-center space-y-6">
                <h1 className="text-xl md:text-5xl font-bold">Hey there, I&apos;m your personal
                </h1>
                <h1 className="text-xl md:text-5xl font-bold text-primary">
                    AI trip planner
                </h1>

                <p className="text-lg">Tell me what you want and I&apos;ll handle the rest: Flights, Hotels, Trip Planner - all in seconds</p>


                {/* Input Box */}
                <div className="relative">
                    <div className="border rounded-2xl p-4 shadow lg:max-w-3xl mx-auto relative">
                        <Textarea 
                            className="h-28 border-none bg-transparent focus-visible:ring-0 shadow-none resize-none" 
                            placeholder="Create a trip for Lagos Nigeria from New York" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />

                        <Button disabled={!message.trim()} onClick={() => onSend()} className="absolute bottom-6 right-7" size={'icon'}><Send className="h-4 w-4" /></Button>
                    </div>
                </div>

                {/* Suggestion List */}
                <div className="flex gap-5 mx-auto">
                    {suggestions.map((suggestion, index) => (
                        <div className="flex flex-col items-center gap-2 h-30 border rounded-2xl cursor-pointer hover:bg-primary/80 transition-all duration-400 hover:text-white p-2" key={index}>
                            {suggestion.icon}
                            <h2 className="text-md">{suggestion.title}</h2>
                        </div>
                    ))}
                </div>

                {/* Video Section */}
                <div className="mx-auto ">
                    <h2 className="w-full my-7 mt-10 text-center flex gap-2">Not Sure where to start? <strong>See how it works </strong><ArrowDown /></h2>

                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="from-center"
                        videoSrc="https://www.example.com/dummy-video"
                        thumbnailSrc="https://thf.bing.com/th/id/OIP.I3UyJo337Tqjsa1ErElu-wHaD4?w=282&h=180&c=7&r=0&o=7&cb=thfc1falcon4&dpr=1.3&pid=1.7&rm=3"
                        thumbnailAlt="Dummy Video Thumbnail"
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;