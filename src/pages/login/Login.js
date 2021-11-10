import { useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../../context/AuthorizationContext";

import styles from './login.module.css'

const axios = require( 'axios' ).default;

function Login() {

    const { login, toggleAuthorized } = useContext( AuthorizationContext )
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

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

            login(result.data.jwt)

        } catch (e) {
            console.log(e)
            setMessage('Onjuiste login')
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
            {message.length > 0 && <p>{message}</p>}

        </div>
    );
}

export default Login;