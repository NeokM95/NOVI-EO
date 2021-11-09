import { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode"


import { AuthorizationContext } from "../../context/AuthorizationContext";

import styles from './login.module.css'

const axios = require( 'axios' ).default;

function Login() {

    const { login, toggleAuthorized } = useContext( AuthorizationContext )
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let JWT;
    let decodedToken;

    useEffect( () => {

        toggleAuthorized( false )

    }, [] )

    async function attemptLogin(e){

        e.preventDefault()

        try{
            const result = await axios.post('http://localhost:8088/authenticate', {
                username: username,
                password: password
            })


            JWT = result.data.jwt
            decodedToken = jwt_decode( JWT )

            await getUserRole()


        } catch (e) {
            console.log(e)
        }


    }

    async function getUserRole(){
        try {
            const result = await axios.get(`http://localhost:8088/user-role/${decodedToken.sub}`,{
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            })

            let userRole = result.data.authorities[0].authority

            login(userRole)

        } catch(e){
            console.log(e)
        }
    }


    return (
        <div className={ styles["login-container"] }>
            <h1>Login page</h1>

            <form onSubmit={attemptLogin}>
                <label htmlFor="username">
                    username:
                    <input
                        id="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    password:
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Login</button>
            </form>

        </div>
    );
}

export default Login;