import Image from "next/image";
import Link from "next/link";
import { Doc } from "../../../convex/_generated/dataModel";
import { ArrowBigRight } from "lucide-react";

type TripWithImage = Doc<"TripDetailTable"> & { coverImage: string; hotelImages: string[] }

function MyTripCard({ trip }: { trip: TripWithImage }) {
    return (
        <Link href={`/view-trip/${trip._id}`}>
            <div key={trip._id} className=" pb-4 rounded-2xl flex flex-col items-start gap-5 justify-center shadow-md mt-6 hover:scale-95 transition-transform duration-300 cursor-pointer">
                <Image src={trip.coverImage ?? '/assets/movie-app.jpg'} alt={trip.tripDetail.origin} width={300} height={200}
                    quality={100}
                    className="rounded-t-2xl object-cover  w-full h-48" />
                <div className="p-1 px-4 w-full">
                    <h2 className="font-bold text-primary text-xl flex items-center justify-between gap-4">{trip.tripDetail.origin} <span className="text-black"><ArrowBigRight /></span> {trip.tripDetail.destination}</h2>
                    <p className="font-bold">Duration: {trip.tripDetail.duration}</p>
                    <p className="text-blue-500 font-bold">Group Size: {trip.tripDetail?.groupSize}</p>
                </div>
            </div>
        </Link>
    );
}

export default MyTripCard;
