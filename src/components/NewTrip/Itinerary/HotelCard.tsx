"use client"
import { ExternalLink, Star, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import axios from "axios";
import { Hotel } from "@/types";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

function HotelCard({ hotel, index }: { hotel: Hotel, index: number }) {
    const cachedPhotoUrl = useQuery(api.photoCache.getCachedPhotoUrl, {
        hotelName: hotel.hotel_name,
    });
    const storeCachedPhotoUrl = useMutation(api.photoCache.storeCachedPhotoUrl);

    useEffect(() => {
        if (cachedPhotoUrl === undefined || cachedPhotoUrl) return;

        let ignore = false;

        axios.post('/api/google-place-detail', {
            placeName: hotel.hotel_name
        }).then(result => {
            console.log(result, "result")
            const url = result?.data?.image;
            if (!ignore && url) {
                storeCachedPhotoUrl({ hotelName: hotel.hotel_name, photoUrl: url });
            }
        }).catch(() => {});

        return () => { ignore = true; };
    }, [hotel, cachedPhotoUrl, storeCachedPhotoUrl])

    const photoUrl = cachedPhotoUrl || undefined;

    return (
        <div key={index} className="flex flex-col items-stretch shadow-md">
            <Image src={photoUrl || '/assets/movie-app.jpg'} alt="hotel image" width={300} height={300} className="rounded-t-2xl shadow object-cover mb-2 w-full h-90" />
            <div className="p-3">
                <h2 className="font-semibold text-lg">{hotel?.hotel_name}</h2>
                <h2 className="text-gray-500">{hotel?.hotel_address}</h2>
                <div className="flex justify-between items-center w-full">
                    <p className="text-green-500 flex gap-2"><Wallet /> {hotel?.price_per_night}</p>
                    <p className="text-yellow-500 flex gap-2"><Star /> {hotel?.rating}</p>
                </div>
                {/* <p className="line-clamp-2 text-gray-500">{hotel?.description}</p> */}
                <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        hotel?.hotel_name ?? ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant={'outline'} className="my-4 w-full cursor-pointer">View on Map <ExternalLink /></Button>
                </Link>
            </div>
        </div>
    );
}

export default HotelCard;