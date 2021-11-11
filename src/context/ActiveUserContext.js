import { createContext } from "react";
import { AuthorizationContext } from "./AuthorizationContext";

export const ActiveUserContext= createContext({})

function ActiveUserContextProvider({children}){


    const contextData = {

    }

    return(
        <ActiveUserContext.Provider value={contextData}>
            {children}
        </ActiveUserContext.Provider>
    )

}

export default ActiveUserContextProvider;