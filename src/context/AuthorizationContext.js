import {createContext, useState} from "react";
import { useHistory } from "react-router-dom";

export const AuthorizationContext = createContext({})

function AuthorizationContextProvider({children}){

    const [isAuthorized, toggleAuthorized] = useState(false)
    const [isStudent, toggleIsStudent] = useState(false)
    const [isTeacher, toggleIsTeacher] = useState(false)
    const [isAdmin, toggleIsAdmin] = useState(false)

    const [madeChoice, setMadeChoice] = useState(false)

    const history = useHistory()

    function login(){
        toggleAuthorized(true)

        if(isStudent){
            history.push("/student-dashboard")
        }
        else if(isTeacher){
            history.push("/teacher-dashboard")
        }
        else if(isAdmin){
            history.push("/admin-dashboard")
        }else{
            history.push("/")
        }

    }

    function logout(){
        toggleAuthorized(false)

        setMadeChoice(false)

        history.push("/login")
    }

    function setStudent(){
        toggleIsStudent(true )
        toggleIsTeacher(false)
        toggleIsAdmin(false)

        setMadeChoice(true)
    }

    function setTeacher(){
        toggleIsStudent(false)
        toggleIsTeacher(true)
        toggleIsAdmin(false)

        setMadeChoice(true)
    }

    function setAdmin(){
        toggleIsStudent(false)
        toggleIsTeacher(false)
        toggleIsAdmin(true)

        setMadeChoice(true)
    }


    const contextData = {
        isAuthorized,
        login,
        logout,
        isStudent,
        setStudent,
        isTeacher,
        setTeacher,
        isAdmin,
        setAdmin,
        madeChoice
    }

    return(
        <AuthorizationContext.Provider value={contextData}>
            {children}
        </AuthorizationContext.Provider>
    )

}

export default AuthorizationContextProvider