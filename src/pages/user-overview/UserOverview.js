import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";

import { AuthorizationContext } from "../../context/AuthorizationContext";

function UserOverview() {

    const [ userData, setUserData ] = useState( [] )

    const { JWT } = useContext( AuthorizationContext )


    async function fetchData() {


        try {

            const result = await axios.get( `http://localhost:8088/api/v1/admin/view/all`, {
                headers: {
                    'Authorization': `Bearer ${ JWT }`
                }
            } )
            console.log( result.data )
            setUserData( result.data )

        } catch ( e ) {
            console.log( e )
        }

    }


    return (
        <>
            <h1>Gebruikers Overzicht</h1>
            <button onClick={ () => fetchData() }>klik</button>
            { userData.length > 0 &&

            <table>
                <th>Naam</th>
                <th>Email</th>
                { userData.map( ( user ) => {
                    return (
                        <>
                            <tr>
                                <td>{ user.username }</td>
                                <td>{ user.email }</td>
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