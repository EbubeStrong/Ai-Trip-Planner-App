"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cities } from "../data";
import { CityCard } from "./CityCard";

export default function PopularCityListings() {
    const sectionRef = useRef<HTMLElement>(null);
    const galleryWrapperRef = useRef<HTMLDivElement>(null);
    const galleryTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const galleryWrapper = galleryWrapperRef.current;
        const galleryTrack = galleryTrackRef.current;

        if (!galleryWrapper || !galleryTrack) return;

        const context = gsap.context(() => {
            let horizontalScrollDistance = 0;

            const updateMeasurements = () => {
                horizontalScrollDistance = Math.max(
                    galleryTrack.scrollWidth - window.innerWidth,
                    0,
                );
            };

            updateMeasurements();

            const tween = gsap.to(galleryTrack, {
                x: () => -horizontalScrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: galleryWrapper,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => `+=${horizontalScrollDistance}`,
                    invalidateOnRefresh: true,
                    onRefreshInit: updateMeasurements,
                },
            });
            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
            };
        }, sectionRef);

        return () => {
            context.revert();
        };
    }, []);

    return (
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



