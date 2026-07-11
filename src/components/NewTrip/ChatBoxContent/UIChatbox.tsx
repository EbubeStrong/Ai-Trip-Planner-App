"use client"
import { Globe2, Minus, Plus } from "lucide-react";
import { SelectBudgetOptions, SelectTravelsList } from "../../data";
import { Button } from '@/components/ui/button'
import { useState } from "react";
import { ChatBoxSelectedBudgetUIProps, ChatBoxSelectedUIProps, ChatBoxTravelDaysUIProps, ChatBoxViewTripUIProps } from "@/types";

export const ChatBoxGroupSizeUI = ({ onSelectedOption }: ChatBoxSelectedUIProps) => {
    return (
        <div className="grid gap-4  grid-cols-2 lg:grid-cols-4 items-stretch mt-2">
            {SelectTravelsList.map((item, index) => (
                <div className="p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer duration-300 hover:scale-90" key={index}
                    onClick={() => onSelectedOption(`${item.title} : ${item.people}`)}
                >
                    <h2>{item.icon}</h2>
                    <h2>{item.title}</h2>
                </div>
            ))}
        </div>
    );
}

export const ChatBoxBudgetUI = ({ onSelectedBudgetOption }: ChatBoxSelectedBudgetUIProps) => {
    return (
        <div className="grid gap-2 grid-cols-2 lg:grid-cols-3  mt-2">
            {SelectBudgetOptions.map((item, index) => (
                <div className="p-3 border rounded-2xl flex flex-col items-center md:w-30 bg-white hover:border-primary cursor-pointer duration-300 hover:scale-90" key={index}
                    onClick={() => onSelectedBudgetOption(`${item.title} : ${item.description}`)}
                >
                    <div className={`text-3xl h-15 w-15 rounded-full flex justify-center items-center ${item?.color}`}>
                        <h2>{item.icon}</h2>
                    </div>
                    <h2>{item.title}</h2>
                    <p className="text-sm text-center text-gray-500">{item.description}</p>
                </div>
            ))}
        </div>
    );
}

export const ChatBoxTravelDaysUI = ({ ChatBoxSelectedTravelDayOption }: ChatBoxTravelDaysUIProps) => {
    const [days, setDays] = useState<number>(1);

    return (
        <div className="space-y-6">
            <h2 className="text-xl text-center text-primary font-bold">
                How many days do you want to travel?
            </h2>

            <div className="flex items-center justify-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDays((prev) => Math.max(1, prev - 1))}
                >
                    <Minus className="h-5 w-5" />
                </Button>

                <div className="w-24 rounded-lg border bg-background py-4 text-center">
                    <p className="text-4xl font-bold">{days}</p>
                    <p className="text-sm text-muted-foreground">
                        {days === 1 ? "day" : "days"}
                    </p>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDays((prev) => prev + 1)}
                >
                    <Plus className="h-5 w-5" />
                </Button>
            </div>

            <Button
                className="w-full"
                onClick={() => ChatBoxSelectedTravelDayOption(days)}
            >
                Confirm
            </Button>
        </div>
    )
}

export const ChatBoxFinalUI = ({ onSelectedViewTripOption, disableBtn }: ChatBoxViewTripUIProps) => {
    return (
        <div className="flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-2xl">
            <Globe2 className="text-primary text-4xl animate-bounce" />
            <h2 className="mt-3 text-lg font-bold text-primary">
                ✈️ Planning your dream trip
            </h2>
            <h2 className="mt-3 text-md mb-2 font-semibold text-primary/70">
                Your dream trip awaits you this moment...
            </h2>
            <p className="text-gray-500 mb-3 text-sm text-center mt-1">
                Gathering the best destinations, activities, and travel details for you.
            </p>
            <Button
            disabled={disableBtn}
                onClick={() => onSelectedViewTripOption('View Trip')}
                className="w-full"
            >View Trip</Button>
        </div>
    );
}



