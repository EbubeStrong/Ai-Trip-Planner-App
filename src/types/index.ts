import type { Id } from "../../convex/_generated/dataModel";

type City = {
  category: string;
  title: string;
  src: string;
  //   content: ReactNode
};

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
  icon: React.ReactNode;
};

export type MenuOptionsProps = {
  name: string;
  path: string;
};

export type SelectListProps = {
  id: number;
  title: string;
  description: string;
  icon: string;
  people?: string;
  color?: string;
};

export type UserDetails = {
  _id: Id<"UserTable">;
  name: string;
  email: string;
  imageUrl: string;
  subscription?: string;
};

export type ChatBoxSelectedBudgetUIProps = {
    onSelectedBudgetOption: (option: string) => void;
};

export type ChatBoxSelectedUIProps = {
    onSelectedOption: (option: string) => void;
};

export type ChatBoxViewTripUIProps = {
    onSelectedViewTripOption: (option: string) => void;
    disableBtn: boolean
};
export type ChatBoxTravelDaysUIProps = {
    ChatBoxSelectedTravelDayOption: (option: number) => void;
};


export type TripPlanProps = {
  destination: string;
  duration: string;
  origin: string;
  groupSize: string;
  budget: string;
  hotels: Hotel[];
  itinerary: Itinerary[];
  activities?: Activity[];
};

export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates?: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
};

export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  place_address: string;
  ticket_pricing: string;
  best_time_to_visit: string;
  time: string;
};

export type Itinerary = {
  day: number;
  plan: string;
  best_time_to_visit?: string;
  activities?: Activity[]
};
