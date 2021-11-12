import React from 'react';

import students from "../../data/students.json"

import AslBtn from "../../components/add-subtract-level-button/AslBtn";

function StudentOverview(  ) {




    return (
        <>
        <h1>Leerlingen overzicht!!</h1>

            <h3>Total students: { students.length }</h3>

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
                { students.map( ( student ) => {
                    const { plusminus, clock, multiply, money, division, geometry } = student.subgroups;

                    return(
                        <tr>
                            <td>{ student.name } </td>
                            <td>{ plusminus }<AslBtn/> </td>
                            <td>{ multiply } <AslBtn /> </td>
                            <td>{ division } <AslBtn/> </td>
                            <td>{ clock } <AslBtn/> </td>
                            <td>{ money } <AslBtn/> </td>
                            <td>{ geometry } <AslBtn/> </td>
                        </tr>
                    )
                } ) }
            </table>

        </>

    );
}

export default StudentOverview;