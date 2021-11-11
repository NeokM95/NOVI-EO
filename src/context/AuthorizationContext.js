import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode"

export const AuthorizationContext = createContext({})

function AuthorizationContextProvider({children}){

    const [isAuthorized, toggleAuthorized] = useState(false)
    const [isStudent, toggleIsStudent] = useState(false)
    const [isTeacher, toggleIsTeacher] = useState(false)
    const [isAdmin, toggleIsAdmin] = useState(false)

    const [activeUsername, setActiveUsername] = useState('')

    // Waar was deze ook alweer nodig?
    const [JWT, setJWT] = useState('')

    const history = useHistory()

    async function login(JWTInput){

        setJWT(JWTInput)

        let userRole = await getUserRole(JWTInput)

        // Set JWT in localStorage not implemented jet:
        // localStorage.setItem( 'token', JWT )

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

    async function getUserRole(JWTInput){

        let decodedToken = jwt_decode(JWTInput)

            setActiveUsername(decodedToken.sub)

        try {

            const result = await axios.get(`http://localhost:8088/user-role/${decodedToken.sub}`,{
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            })

            console.log("Ik ben ook hier")

            return result.data.authorities[0].authority

        } catch(e){
            console.log(e)
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
        toggleAuthorized,
        login,
        logout,
        isStudent,
        isTeacher,
        isAdmin,
        JWT,
        activeUsername
    }

    return(
        <AuthorizationContext.Provider value={contextData}>
            {children}
        </AuthorizationContext.Provider>
    )

}

export default AuthorizationContextProvider