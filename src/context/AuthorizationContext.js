import {createContext, useState} from "react";
import { useHistory } from "react-router-dom";

export const AuthorizationContext = createContext({})

function AuthorizationContextProvider({children}){

    const [isAuthorized, toggleAuthorized] = useState(false)
    const [isStudent, toggleIsStudent] = useState(false)
    const [isTeacher, toggleIsTeacher] = useState(false)
    const [isAdmin, toggleIsAdmin] = useState(false)

    const history = useHistory()

    function login(userRole){

        toggleAuthorized(true)

        if(userRole === "ROLE_STUDENT"){
            setStudent()
            history.push("/student-dashboard")
        }
        else if(userRole === "ROLE_TEACHER"){
            setTeacher()
            history.push("/teacher-dashboard")
        }
        else if(userRole === "ROLE_ADMIN"){
            setAdmin()
            history.push("/admin-dashboard")
        }else{
            history.push("/")
        }

    }

    function logout(){
        toggleAuthorized(false)

        history.push("/login")
    }

    function setStudent(){
        toggleIsStudent(true )
        toggleIsTeacher(false)
        toggleIsAdmin(false)
    }

    function setTeacher(){
        toggleIsStudent(false)
        toggleIsTeacher(true)
        toggleIsAdmin(false)
    }

    function setAdmin(){
        toggleIsStudent(false)
        toggleIsTeacher(false)
        toggleIsAdmin(true)
    }


    const contextData = {
        isAuthorized,
        login,
        logout,
        isStudent,
        isTeacher,
        isAdmin,
        toggleAuthorized,
        toggleIsAdmin
    }

    return(
        <AuthorizationContext.Provider value={contextData}>
            {children}
        </AuthorizationContext.Provider>
    )

}

export default AuthorizationContextProvider