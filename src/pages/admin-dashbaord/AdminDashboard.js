import Styles from "./adminDashboard.module.css"
import { useContext, useState } from "react";
import axios from "axios";

import { AuthorizationContext } from "../../context/AuthorizationContext";

function AdminDashboard() {

    const [ email, setEmail ] = useState( '' )
    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ confirmedPassword, setConfirmedPassword ] = useState( '' )
    const [ userRole, setUserRole ] = useState( 'admin' )

    const [ message, setMessage ] = useState( '' )

    const [ madeChoice, setMadeChoice ] = useState( false )

    const { JWT, activeUsername } = useContext( AuthorizationContext )


    function createUser( e ) {
        setMessage( '' )

        e.preventDefault()

        if ( password !== confirmedPassword ) {
            setMessage( 'Wachtwoorden komen niet overeen!' )
        } else {
            if ( userRole === 'admin' ) {
                createAdmin()
            } else {
                createTeacher()
            }
        }

    }

    async function createAdmin() {

        try {

            await axios.post( `http://localhost:8088/api/v1/admin/create/admin`,
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

            setMessage( `User '${ username }' succesvol aangemaakt!` )
            clearForm()

        } catch ( e ) {

            console.log( e.response.data )
            setMessage( e.response.data.message )

        }
    }

    async function createTeacher() {

        try {

            await axios.post( `http://localhost:8088/api/v1/admin/create/teacher`,
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

            setMessage( `User '${ username }' succesvol aangemaakt!` )
            clearForm()

        } catch ( e ) {

            console.log( e.response.data )
            setMessage( e.response.data.message )

        }
    }

    function clearForm() {
        setEmail( '' )
        setUsername( '' )
        setPassword( '' )
        setConfirmedPassword( '' )
    }


    return (

        <>

            { !madeChoice ?
                <>

                    <h1 className={Styles["admin-db-header"]}>Welkom {activeUsername}, wat wil je doen?</h1>

                    <div className={Styles["first-row"]}>
                        <div className="db-outer-btn" onClick={ () => {
                            setMadeChoice( true )
                        } }>
                            <div className="db-option-btn">
                                <h3>Update Account</h3>
                            </div>
                        </div>
                        <div className="db-outer-btn" onClick={ () => {
                            setMadeChoice( true )
                        } }>
                            <div className="db-option-btn">
                                <h3>Maak Nieuwe Gebruiker</h3>
                            </div>
                        </div>
                    </div>
                    <div className={Styles["second-row"]}>
                        <div className="db-outer-btn" onClick={ () => {
                            setMadeChoice( true )
                        } }>
                            <div className="db-option-btn">
                                <h3>Gebruikers Overzicht</h3>
                            </div>
                        </div>
                        <div className="db-outer-btn" onClick={ () => {
                            setMadeChoice( true )
                        } }>
                            <div className="db-option-btn">
                                <h3>Zelf Oefenen</h3>
                            </div>
                        </div>
                    </div>
                </>

                :
                <h1>iets anders</h1>

            }
            {/*    <form className={ Styles["admin-form"] } onSubmit={ createUser }>*/ }
            {/*        <h3>Nieuw Account Aanmaken</h3>*/ }
            {/*        <label htmlFor="email">*/ }
            {/*            Email:*/ }
            {/*            <input*/ }
            {/*                type="email"*/ }
            {/*                id="email"*/ }
            {/*                value={ email }*/ }
            {/*                onChange={ ( e ) => setEmail( e.target.value ) }*/ }
            {/*                required*/ }
            {/*            />*/ }
            {/*        </label>*/ }
            {/*        <label htmlFor="username">*/ }
            {/*            Username:*/ }
            {/*            <input*/ }
            {/*                type="text"*/ }
            {/*                id="username"*/ }
            {/*                minLength="4"*/ }
            {/*                maxLength="20"*/ }
            {/*                value={ username }*/ }
            {/*                onChange={ ( e ) => setUsername( e.target.value ) }*/ }
            {/*                required*/ }
            {/*            />*/ }
            {/*        </label>*/ }
            {/*        <label htmlFor="password">*/ }
            {/*            Password:*/ }
            {/*            <input*/ }
            {/*                type="password"*/ }
            {/*                id="password"*/ }
            {/*                minLength="8"*/ }
            {/*                maxLength="20"*/ }
            {/*                value={ password }*/ }
            {/*                onChange={ ( e ) => setPassword( e.target.value ) }*/ }
            {/*                required*/ }
            {/*            />*/ }
            {/*        </label>*/ }
            {/*        <label htmlFor="confirmPassword">*/ }
            {/*            Bevestig Password:*/ }
            {/*            <input*/ }
            {/*                type="password"*/ }
            {/*                id="confirmPassword"*/ }
            {/*                minLength="8"*/ }
            {/*                maxLength="20"*/ }
            {/*                value={ confirmedPassword }*/ }
            {/*                onChange={ ( e ) => setConfirmedPassword( e.target.value ) }*/ }
            {/*                required*/ }
            {/*            />*/ }
            {/*        </label>*/ }
            {/*        <label htmlFor="user-role">Kies gebruikers rol:</label>*/ }
            {/*        <select name="user-role" id="user-role" onChange={ ( e ) => setUserRole( e.target.value ) }>*/ }
            {/*            <option value="admin">Admin</option>*/ }
            {/*            <option value="teacher">Leraar</option>*/ }
            {/*        </select>*/ }
            {/*        <button type="submit">Maak Account</button>*/ }
            {/*    </form>*/ }

            {/*    { message.length > 0 && <p>{ message }</p> }*/ }
            {/*</>*/ }
        </>
    );
}

export default AdminDashboard;