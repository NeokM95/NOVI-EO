import { useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../../context/AuthorizationContext";
import { ActiveUserContext } from "../../context/ActiveUserContext";

import styles from './login.module.css'

const axios = require( 'axios' ).default;

function Login() {

    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ message, setMessage ] = useState( '' )

    const [ test, setTest ] = useState( false )

    const { login, toggleAuthorized } = useContext( AuthorizationContext )
    const { setActiveUserData } = useContext( ActiveUserContext )

    useEffect( () => {

        toggleAuthorized( false )

    }, [] )

    useEffect( () => {

        if ( test === true ) {
            async function fetchData() {

                try {
                    const result = await axios.post( 'http://localhost:8088/authenticate', {
                        username: username,
                        password: password
                    } )

                    let jwt = result.data.jwt

                    await login( jwt )

                    await ( setActiveUserData( jwt ) )


                } catch ( e ) {
                    console.log( e )
                    setMessage( 'Onjuiste login' )
                }

            }

            fetchData()

        } else {

            console.log( "Ik word toch wel geladen!" )

        }



    }, [ test ] )



    function createApiReq( e ) {

        e.preventDefault()

        setTest(true)


    }

    return (
        <div className={ styles["login-container"] }>
            <form className={ styles["login-form"] } onSubmit={ createApiReq }>
                <label htmlFor="username">
                    username:
                    <input
                        id="username"
                        type="text"
                        onChange={ ( e ) => setUsername( e.target.value ) }
                    />
                </label>
                <label htmlFor="password">
                    password:
                    <input
                        id="password"
                        type="password"
                        onChange={ ( e ) => setPassword( e.target.value ) }
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            { message.length > 0 && <p>{ message }</p> }

        </div>
    );
}

export default Login;