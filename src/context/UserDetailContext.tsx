import { createContext, Dispatch, SetStateAction } from "react";
import { UserDetails } from "@/types";

type UserDetailContextType = {
    userDetails: UserDetails | null;
    setUserDetails: Dispatch<SetStateAction<UserDetails | null>>;
};

export const UserDetailContext = createContext<UserDetailContextType | null>(null)