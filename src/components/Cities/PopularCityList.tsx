"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cities } from "../data";
import { CityCard } from "./CityCard";

gsap.registerPlugin(ScrollTrigger);

export default function PopularCityListings() {
    const sectionRef = useRef<HTMLElement>(null);
    const galleryWrapperRef = useRef<HTMLDivElement>(null);
    const galleryTrackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const galleryWrapper = galleryWrapperRef.current;
        const galleryTrack = galleryTrackRef.current;

        if (!galleryWrapper || !galleryTrack) return;

        const context = gsap.context(() => {
            let trackWidth = 0;
            let horizontalScrollDistance = 0;

            const updateMeasurements = () => {
                trackWidth = galleryTrack.scrollWidth;
                horizontalScrollDistance = trackWidth - window.innerWidth;
            };

            updateMeasurements();

            gsap.to(galleryTrack, {
                x: () => -horizontalScrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: galleryWrapper,
                    pin: true,
                    scrub: 1,
                    start: "center center", // or "top top"
                    end: () => `+=${horizontalScrollDistance}`,
                    invalidateOnRefresh: true,
                },
            });

            ScrollTrigger.addEventListener("refreshInit", updateMeasurements);


        }, sectionRef);

        return () => context.revert();
    }, []);

    return (
        // <section ref={sectionRef} id="portfolio" className="py-20">
        //     <div className="mx-auto max-w-screen-2xl">
        //         <div
        //             ref={galleryWrapperRef}
        //             className="overflow-hidden h-screen flex items-center"
        //         >
        //             <div
        //                 ref={galleryTrackRef}
        //                 className="flex gap-8 w-max px-10"
        //             >
        //                 {images.map((image, index) => (
        //                     <div
        //                         key={index}
        //                         className="flex-shrink-0 w-[400px] h-[600px] rounded-3xl overflow-hidden"
        //                     >
        //                         <Image
        //                             src={image}
        //                             alt={`Project ${index + 1}`}
        //                             width={400}
        //                             height={600}
        //                             className="w-full h-full object-cover"
        //                         />
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </section>
        <section ref={sectionRef} className="pt-20">
            <div className="mx-auto max-w-screen-2xl">
                <h2 className=" max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-primary/80">
                    Popular Destinations to visit
                </h2>
                <div
                    ref={galleryWrapperRef}
                    className="overflow-hidden h-screen flex items-center"
                >
                    <div
                        ref={galleryTrackRef}
                        className="flex gap-8 w-max px-10"
                    >
                        {cities.map((city, index) => (
                            <CityCard
                                key={city.src}
                                city={city}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}



