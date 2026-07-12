"use client"
import { use, useContext } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Itinerary } from "@/components/NewTrip/Itinerary/Itinerary";
import { TripPlanProps } from "@/types";
import { Id } from "../../../../../convex/_generated/dataModel";
import { ChatContext } from "@/context/ChatContext";
import { Loader } from "lucide-react";
import GlobalMap from "@/components/NewTrip/Map/globalMap";

function ViewTrip({ params }: { params: Promise<{ tripid: string }> }) {
    const { tripid } = use(params);

    const contextTripId = useContext(ChatContext)?.tripId ?? null;

    const activeTripId = tripid || contextTripId;

    const tripData = useQuery(
        api.tripDetail.GetTripById,
        activeTripId ? { tripId: activeTripId as Id<"TripDetailTable"> } : "skip"
    );

    if (!activeTripId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-500">No trip ID provided.</p>
            </div>
        );
    }

    if (tripData === undefined) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="animate-spin" />
            </div>
        );
    }

    if (tripData === null) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-500">Trip not found.</p>
            </div>
        );
    }

    const tripDetail: TripPlanProps = {
        origin: tripData.tripDetail.origin,
        destination: tripData.tripDetail.destination,
        duration: tripData.tripDetail.duration,
        budget: tripData.tripDetail.budget,
        groupSize: tripData.tripDetail.groupSize,
        hotels: tripData.tripDetail.hotels,
        itinerary: tripData.tripDetail.itinerary,
        activities: tripData.tripDetail.activities,
    };

    return (
        // <div className="px-4 py-6 md:px-8 lg:px-16">
        <div className="grid md:grid-cols-5 lg:fixed px-4 pt-2 md:px-8 ">
            <div className="col-span-3">
                <Itinerary tripDetail={tripDetail} />
            </div>

            <div className="col-span-2">
                <GlobalMap tripDetail={tripDetail} />
            </div>
        </div>
    );
}

export default ViewTrip;
