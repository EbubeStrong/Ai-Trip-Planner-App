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

export type Message = {
    role: string;
    content: string;
    ui?: string;
};

export type HeaderMobileNavProps = {
  isSignedIn: boolean;
};

export type EmptyChatboxDisplayMessageProps = {
    onSelectOption: (option: string) => void;
};

export type SuggestionsProps = {
    title: string;
    icon: React.ReactNode
}

export type MenuOptionsProps = {
    name: string;
    path: string
}

export type SelectListProps = {
    id: number;
    title: string;
    description: string;
    icon: string;
    people?: string;
    color?: string;
}

export type TripPlanProps = {
    budget: string;
    destination: string;
    duration: string;
    group_size: string;
    origin: string;
    hotels: string[];
    itinerary: string[]
    activities?: string[]
}