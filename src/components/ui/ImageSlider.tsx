"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { images } from "../data";


export function ImageSlider() {
    return (
        <div className="flex justify-center items-center min-h-screen">
        <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            
            className="w-[700px] h-[700px] relative rounded-2xl overflow-hidden"
        >
            {images.map((image, i) => (
                <SwiperSlide key={i} className="!h-full pt-5 mx-auto">
                            <Image src={image} alt="Picture" className="w-180 h-150 rounded-2xl object-cover" width={700} height={700} />
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
}
