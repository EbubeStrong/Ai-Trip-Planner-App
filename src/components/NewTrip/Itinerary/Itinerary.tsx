"use client"
import { Timeline } from "@/components/ui/timeline";
import { ItineraryData } from "../../data";

export function Itinerary() {
 
  return (
    <div className="relative w-full ">
      <Timeline data={ItineraryData}/>
    </div>
  );
}
