import styles from "./adminDashboard.module.css"
import { useContext, useState } from "react";
import axios from "axios";

import DashboardBtn from "../../components/dashboard-button/DashboardBtn";
import DashboardHeader from "../../components/dashboard-header/DashboardHeader";
import BackToDashboardArrow from "../../components/back-to-db-arrow/BackToDashboardArrow";
import ExercisePage from "../exercise-page/ExercisePage";
import UpdateProfile from "../update-profile/UpdateProfile";

import { AuthorizationContext } from "../../context/AuthorizationContext";
import { ActiveUserContext } from "../../context/ActiveUserContext";

function AdminDashboard() {

    const [ email, setEmail ] = useState( '' )
    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ confirmedPassword, setConfirmedPassword ] = useState( '' )
    const [ userRole, setUserRole ] = useState( 'admin' )

    const [ message, setMessage ] = useState( '' )


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

    //-------------------------------------------------------------------------

    const [ madeChoice, setMadeChoice ] = useState( false )
    const [ playtime, setPlaytime ] = useState( false )
    const [ userOverview, setUserOverview ] = useState( false )

    const { JWT } = useContext( AuthorizationContext )
    const { activeUserDetails } = useContext( ActiveUserContext )

    function setPractice(){
        setMadeChoice(true)
        setPlaytime(true)
    }

    function setUserOverviewPage(){
        setMadeChoice(true)
        setUserOverview(true)
    }

    function setUpdateAccount() {
        setMadeChoice( true )
    }

    function reset() {
        setMadeChoice( false )
        setPlaytime( false )
        setUserOverview( false )
    }


    return (

        <>

            { !madeChoice ?
                <>
                    <DashboardHeader name={ activeUserDetails.username }/>
                    <div className={ styles["admin-db-btn-container"] }>
                        <DashboardBtn btnTitle="Update Account" onClick={setUpdateAccount}/>
                        <DashboardBtn btnTitle="Gebruikers Overzicht" onClick={setUserOverviewPage}/>
                        <DashboardBtn btnTitle="Zelf Oefenen" onClick={setPractice}/>
                    </div>

                </>

                :
                <>
                    { playtime ?
                        <ExercisePage/>
                        : userOverview ?
                            <h1>Hier komt nog een UserOverview component</h1>
                            :
                            <UpdateProfile currentProfile={activeUserDetails}/>
                    }
                    <BackToDashboardArrow onClick={reset}/>
                </>

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