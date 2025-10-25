import { createContext } from "react";

interface USER_CONTEXT {
    id:number;
    username:string;
}

export const UserContext = createContext<USER_CONTEXT | null>(null)