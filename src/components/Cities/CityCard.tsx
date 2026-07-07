import { CityCardProps } from "@/types/index";
import Image from "next/image";

export const CityCard = ({ city }: CityCardProps) => {
    return (
        <article className="relative w-100 h-150 shrink-0 rounded-3xl overflow-hidden cursor-pointer hover:scale-95 transition-all duration-400">
            <Image
                src={city.src}
                alt={city.title}
                fill
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute top-0 p-8 text-white flex flex-1 flex-col gap-2">
                <p className="text-3xl font-bold">{city.category}</p>
                <h3 className="font-normal">
                    {city.title}
                </h3>
            </div>
        </article>
    );
}