import Styles from "./adminDashboard.module.css"
import { useContext, useState } from "react";
import axios from "axios";

import { AuthorizationContext } from "../../context/AuthorizationContext";

function AdminDashboard() {

    const [ email, setEmail ] = useState( '' )
    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ userRole, setUserRole ] = useState( 'admin' )

    const [errorMessage, setErrorMessage] = useState('')

    const { JWT } = useContext( AuthorizationContext )


    function createUser(e) {

        e.preventDefault()

        if(userRole === 'admin'){
            createAdmin()
        } else {
            createTeacher()
        }
    }

    async function createAdmin( ) {

        setErrorMessage('')

        try {

            const result = await axios.post( `http://localhost:8088/api/v1/admin/create/admin`,
                {
                    email: email,
                    username: username,
                    password: password
                },
                {
                    headers: {
                        'Authorization': `Bearer ${ JWT }`
                    }
                } )
            console.log( result.data )
        } catch (e) {

            for ( let i = 0; i < e.response.data.errors.length ; i++ ) {
                console.log(e.response.data.errors[i].defaultMessage)
            }

        }
    }

    async function createTeacher( ) {

        try {

            const result = await axios.post( `http://localhost:8088/api/v1/admin/create/teacher`,
                {
                    email: email,
                    username: username,
                    password: password
                },
                {
                    headers: {
                        'Authorization': `Bearer ${ JWT }`
                    }
                } )
            console.log( result.data )
        } catch ( e ) {
            console.log( e )
        }
    }


    return (

        <>
            <h1>Je bent op de admin page</h1>

            <form className={ Styles["admin-form"] } onSubmit={ createUser }>
                <h3>Nieuw Account Aanmaken</h3>
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        id="email"
                        onChange={ ( e ) => setEmail( e.target.value ) }
                        required
                    />
                </label>
                <label htmlFor="username">
                    Username:
                    <input
                        type="text"
                        id="username"
                        minLength="4"
                        maxLength="20"
                        onChange={ ( e ) => setUsername( e.target.value ) }
                        required
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input
                        type="password"
                        id="password"
                        minLength="8"
                        maxLength="20"
                        onChange={ ( e ) => setPassword( e.target.value ) }
                        required
                    />
                </label>
                <label htmlFor="user-role">Kies gebruikers rol:</label>
                <select name="user-role" id="user-role" onChange={(e) => setUserRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="teacher">Leraar</option>
                </select>

                <button type="submit">Maak Account</button>

                {errorMessage.length > 0 && <p>{errorMessage}</p>}

            </form>

        </>

    );
}

export default AdminDashboard;