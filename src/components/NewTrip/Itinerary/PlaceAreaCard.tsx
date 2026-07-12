"use client"
import { Itinerary, Activity } from "@/types";
import { Clock, ExternalLink, Ticket, Timer } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

function PlaceAreaCard({dayData}: {dayData: Itinerary}) {
    const storeCachedPhotoUrl = useMutation(api.photoCache.storeCachedPhotoUrl);
    const pathname = usePathname();
    const isViewTrip = pathname.startsWith("/view-trip");

    return (
        <div>
            <p className="mb-4 font-bold text-primary">Best Time: {dayData?.best_time_to_visit}</p>

            <div className={`grid gap-4 ${isViewTrip ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2"}`}>
                {dayData?.activities?.map((activity, index) => (
                    <ActivityCard key={index} activity={activity} storeCachedPhotoUrl={storeCachedPhotoUrl} />
                ))}
            </div>
        </div>
    );
}
// ${isViewTrip ? " min-[1400px]:flex-row" : "md:flex-row"}

function ActivityCard({ activity, storeCachedPhotoUrl }: { activity: Activity, storeCachedPhotoUrl: (args: { hotelName: string; photoUrl: string }) => void }) {
    const cachedPhotoUrl = useQuery(api.photoCache.getCachedPhotoUrl, {
        hotelName: activity.place_name,
    });

    useEffect(() => {
        if (cachedPhotoUrl === undefined || cachedPhotoUrl) return;

        let ignore = false;

        axios.post('/api/google-place-detail', {
            placeName: activity.place_name
        }).then(result => {
            console.log(result)
            const url = result?.data?.image;
            if (!ignore && url) {
                storeCachedPhotoUrl({ hotelName: activity.place_name, photoUrl: url });
            }
        }).catch(() => {});

        return () => { ignore = true; };
    }, [activity.place_name, cachedPhotoUrl, storeCachedPhotoUrl])

    const photoUrl = cachedPhotoUrl || undefined;

    return (
        <div className="flex flex-col items-stretch shadow-md">
            <Image src={photoUrl ? photoUrl : '/assets/movie-app.jpg'} alt="activity image" width={400} height={400} className="rounded-t-2xl shadow object-cover mb-2 w-full h-[50vh] border-6" />
            <div className="p-3 flex flex-col gap-2">
                <h2 className="font-semibold text-lg">{activity?.place_name}</h2>
                <p className="text-gray-400 line-clamp-2">{activity?.place_details}</p>
                <h3 className="flex gap-2 text-green-500 font-bold line-clamp-1">
                    <Ticket /> {activity?.ticket_pricing}
                </h3>

                <p className="flex text-orange-400 font-bold gap-2"><Clock /> {activity?.best_time_to_visit}</p>
                <p className="flex text-purple-400 font-bold gap-2"><Timer /> {activity?.time}</p>
                <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        activity?.place_name ?? ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button size={'sm'} variant={'outline'} className="my-4 w-full cursor-pointer">View on Map <ExternalLink /></Button>
                </Link>
            </div>
        </div>
    );
}

export default PlaceAreaCard;