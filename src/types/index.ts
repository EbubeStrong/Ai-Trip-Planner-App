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