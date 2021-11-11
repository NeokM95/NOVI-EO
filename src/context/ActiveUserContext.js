import { createContext, useState } from "react";
import jwt_decode from "jwt-decode"
import axios from "axios";

export const ActiveUserContext = createContext( {} )

function ActiveUserContextProvider( { children } ) {

    const [ activeUserDetails, setActiveUserDetails] = useState({
        username: "User"
    })

    async function setActiveUserData(JWT){

        let decodedToken = jwt_decode(JWT)

        try {

            let result = await axios.get(`http://localhost:8088/api/v1/user/view/${decodedToken.sub}`,{
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            })

            result = result.data

            setActiveUserDetails({
                username: result.username,
                email: result.email,
                plusMinus: result.plusMinus,
                divide: result.divide,
                multiply: result.multiply
            })


        } catch(e){
            console.log(e)
        }

    }

    const contextData = {
        setActiveUserData,
        activeUserDetails

    }

    return (
        <ActiveUserContext.Provider value={ contextData }>
            { children }
        </ActiveUserContext.Provider>
    )

}

export default ActiveUserContextProvider;