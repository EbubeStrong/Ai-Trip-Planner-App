"use client"

import { Button } from "@/components/ui/button";
import { useUserDetails } from "@/lib/provider";
import { useConvex } from "convex/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {  ArrowBigRight } from "lucide-react";
import MyTripCard from "@/components/MyTrips/myTripCard";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

type TripWithImage = Doc<"TripDetailTable"> & { coverImage: string; hotelImages: string[] }

const TRIPS_PER_PAGE = 6

function MyTrips() {
    const [viewMyTrips, setViewMyTrips] = useState<TripWithImage[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)

    const convex = useConvex()
    const { userDetails, setUserDetails } = useUserDetails()

    useEffect(() => {
        if (!userDetails?._id) return;
        const fetchTrips = async () => {
            const result = await convex.query(api.tripDetail.GetUserTrips, { userId: userDetails._id })
            console.log(result)
            setViewMyTrips(result)
        }
        fetchTrips()
    }, [convex, userDetails])

    const totalPages = Math.ceil(viewMyTrips.length / TRIPS_PER_PAGE)
    const startIndex = (currentPage - 1) * TRIPS_PER_PAGE
    const paginatedTrips = viewMyTrips.slice(startIndex, startIndex + TRIPS_PER_PAGE)

    return (
        <div className="px-10 p-10 md:px-24 lg:px-40">
            <h2 className="font-bold text-xl md:text-3xl ">My Trips </h2>

            {viewMyTrips?.length === 0 &&
                <div className="p-7  rounded-2xl flex flex-col items-center gap-5 justify-center mt-6">
                    <h2>You don&apos;t have any trip plan created!</h2>
                    <Link href={'/create-new-trip'}>
                        <Button>Create New Trip</Button>
                    </Link>
                </div>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedTrips?.map((trip) => (
                  <MyTripCard trip={trip} key={trip._id} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={page === currentPage}
                                    onClick={() => setCurrentPage(page)}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}

export default MyTrips;