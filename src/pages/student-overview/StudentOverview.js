import React, { useContext, useEffect, useState } from 'react';

import AslBtn from "../../components/add-subtract-level-button/AslBtn";
import axios from "axios";
import { AuthorizationContext } from "../../context/AuthorizationContext";

function StudentOverview() {

    const [ studentData, setStudentData ] = useState( [] )
    const [ studentName, setStudentName ] = useState( '' )

    const { JWT } = useContext( AuthorizationContext )

    useEffect( () => {

        async function getStudents() {

            try {

                let result = await axios.get( "http://localhost:8088/api/v1/teacher/view/students", {
                    headers: {
                        'Authorization': `Bearer ${ JWT }`
                    }
                } )

                setStudentData( [ ...result.data ] )

                console.log( result.data )

                console.log( "get students lukt." )

            } catch ( e ) {

                console.log( e )
            }

        }

        getStudents()

    }, [] )


    return (
        <>
            <h1>Leerlingen overzicht!!</h1>

            <h3>Total students: { studentData.length }</h3>

            <table>
                <tr>
                    <th>Naam</th>
                    <th>Plus en min</th>
                    <th>Keer sommen</th>
                    <th>Deel sommen</th>
                    <th>Klokkijken</th>
                    <th>Geld rekenen</th>
                    <th>Meetkunde</th>
                </tr>
                { studentData.map( ( student ) => {
                    return (
                        <tr>
                            <td>{ student.username } </td>
                            <td>{ student.plusMinus }<AslBtn user={ student.username } subject="plus-minus"/></td>
                            <td>{ student.multiply } <AslBtn user={ student.username } subject="multiply"/></td>
                            <td>{ student.divide } <AslBtn user={ student.username } subject="divide"/></td>
                            <td> -</td>
                            <td> -</td>
                            <td> -</td>
                        </tr>
                    )
                } ) }
            </table>

        </>

    );
}

export default StudentOverview;