import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";

import styles from './userOverview.module.css'

import { AuthorizationContext } from "../../context/AuthorizationContext";

function UserOverview() {

    const [ userData, setUserData ] = useState( [] )
    const [ apiReq, setApiReq ] = useState( '' )

    const { JWT } = useContext( AuthorizationContext )

    useEffect( () => {

        async function deleteUser( username ) {

            try {
                await axios.delete( `http://localhost:8088/api/v1/admin/delete/${ username }`, {
                    headers: {
                        'Authorization': `Bearer ${ JWT }`
                    }
                } )

            } catch ( e ) {
                console.log( e )
            }

        }

        async function fetchData() {


            try {

                if(apiReq.length > 0){
                    await deleteUser(apiReq)
                }

                console.log( "in fetch section" );

                const result = await axios.get( `http://localhost:8088/api/v1/admin/view/all`, {
                    headers: {
                        'Authorization': `Bearer ${ JWT }`
                    }
                } )

                let newData = result.data

                console.log( newData )

                setUserData( [ ...newData ] )


            } catch ( e ) {
                console.log( e )
            }

        }

        fetchData()

    }, [ apiReq ] )


    return (
        <>
            <h1 className={styles["user-overview-header"]}>Gebruikers Overzicht</h1>
            { userData.length > 0 &&

            <table>
                <th>Naam</th>
                <th>Email</th>
                <th>Gebruikers Rol</th>
                { userData.map( ( user ) => {

                    let isAdmin = ( user.authorities[0].authority === "ROLE_ADMIN" )

                    return (
                        <>
                            <tr>
                                <td>{ user.username }</td>
                                <td>{ user.email }</td>
                                <td>{ user.authorities[0].authority }</td>
                                <td>
                                    <button className={ styles["delete-acc-btn"] } disabled={ isAdmin }
                                            onClick={ () => setApiReq( user.username ) }>
                                        { isAdmin ? "" : "Verwijder Account" }
                                    </button>
                                </td>

                            </tr>
                        </>
                    )

                } ) }
            </table>

            }
        </>

    );
}

export default UserOverview;