"use client"
import { Timeline } from "@/components/ui/timeline";
import HotelCard from "./HotelCard";
import PlaceAreaCard from "./PlaceAreaCard";
import { useChatContext } from "@/context/ChatContext";

export function Itinerary() {
    const { tripDetail } = useChatContext();

    if (!tripDetail) return null;

    const entries = [
        {
            title: "Recommended Hotels",
            content: (
                <div className="flex flex-col lg:flex-row gap-10">
                    {tripDetail.hotels?.map((hotel, index) => (
                        <HotelCard hotel={hotel} index={index} key={index} />
                    ))}
                </div>
            ),
        },
        ...(tripDetail.itinerary?.map((dayData) => ({
            title: `Day ${dayData.day} - ${dayData.plan}`,
            content: <PlaceAreaCard dayData={dayData} />,
        })) ?? []),
    ];

    return (
        <div className="relative w-full">
            <Timeline data={entries} tripInfo={tripDetail} />
        </div>
    );
}
