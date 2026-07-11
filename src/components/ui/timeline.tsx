"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Calendar, Users, Wallet } from "lucide-react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TripInfo {
  origin: string;
  destination: string;
  duration: string;
  budget: string;
  groupSize: string;
}

export const Timeline = ({ data, tripInfo }: { data: TimelineEntry[]; tripInfo: TripInfo | null }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans h-screen overflow-y-scroll no-scrollbar"
      ref={containerRef}
    >
      <div className="mx-auto py-5 px-4 md:px-6">
        <h2 className="text-base sm:text-lg md:text-2xl lg:text-4xl mb-4 text-black dark:text-white max-w-4xl leading-tight">
          Your Trip Itinerary from{" "}<strong className="text-primary">{tripInfo?.origin}</strong>{" "}to{" "}<strong className="text-primary">{tripInfo?.destination}</strong>{" "}is Ready! Here&apos;s a timeline of your trip plan.
        </h2>

        <div className="flex flex-wrap gap-3 md:gap-5 items-center text-sm md:text-base">
          <div className="flex gap-2 items-center">
            <Calendar className="h-4 w-4 md:h-5 md:w-5" />
            <h2>{tripInfo?.duration}</h2>
          </div>

          <div className="flex gap-2 items-center">
            <Wallet className="h-4 w-4 md:h-5 md:w-5" />
            <h2>{tripInfo?.budget}</h2>
          </div>

          <div className="flex gap-2 items-center">
            <Users className="h-4 w-4 md:h-5 md:w-5" />
            <h2>{tripInfo?.groupSize}</h2>
          </div>
        </div>
      </div>

      <div ref={ref} className="relative w-full mx-auto pb-20 px-4 md:px-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-start pt-8 md:pt-10 mb-3 pb-4 md:gap-10"
          >
            <div className="sticky z-40 flex items-start gap-4 md:gap-0 top-24 md:top-40 self-start md:w-[40%] lg:w-[35%]">
              <div className="relative flex items-center justify-center shrink-0">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white dark:bg-black flex items-center justify-center border-2 border-neutral-300 dark:border-neutral-700 z-10">
                  <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                </div>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-neutral-500 dark:text-neutral-500 md:pl-4">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-10 md:pl-4 w-full md:w-[60%] lg:w-[65%] -mt-2 md:mt-0">
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-[15px] md:left-[19px] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
