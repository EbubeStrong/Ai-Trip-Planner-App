type City = {
    category: string;
    title: string;
    src: string;
    //   content: ReactNode 
}

export type CityCardProps = {
    city: City;
    index: number;
};