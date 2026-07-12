"use client"
import { EmptyChatboxDisplayMessageProps } from "@/types";
import { suggestions } from "../../data";

function EmptyChatboxDisplayMessage({ onSelectOption }: EmptyChatboxDisplayMessageProps) {
    return (
        <div className="mt-6 w-full">
            <h2 className="font-bold text-2xl md:text-3xl text-center">Start Planning new <strong className="text-primary">Trip</strong> using AI</h2>
            <p className="text-center text-gray-400 mt-2">Discovering personalized travel itineraries? finding the best destinations and plan your dream vacation effortlessly with the power of A, let our smart assistant do the hard work while you enjoy the journey</p>

            <div className="scrollbar-thin-smooth flex flex-col gap-5 mt-7 mx-auto px-3 h-[40vh] overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                    <div className="flex flex-col items-start gap-2 h-30 border rounded-xl cursor-pointer hover:border-primary/80 transition-all duration-400 p-2" key={index}
                    onClick={() => onSelectOption(suggestion.title)}
                    >
                        {suggestion.icon}
                        <h2 className="text-lg">{suggestion.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EmptyChatboxDisplayMessage;