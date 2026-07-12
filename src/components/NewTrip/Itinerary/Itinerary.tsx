"use client"
import { useContext } from "react";
import { Timeline } from "@/components/ui/timeline";
import { ChatContext } from "@/context/ChatContext";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { TripPlanProps } from "@/types";
import { ItineraryData } from "@/components/data";

export function Itinerary({ tripDetail: propTripDetail }: { tripDetail?: TripPlanProps | null }) {
    const contextTripDetail = useContext(ChatContext)?.tripDetail ?? null;

    const tripDetail = propTripDetail ?? contextTripDetail;

    if (!tripDetail) return(
            <ImageSlider />
    );

    return (
        <div className="relative w-full">
            <Timeline data={ItineraryData} tripInfo={tripDetail} />
        </div>
    );
}
