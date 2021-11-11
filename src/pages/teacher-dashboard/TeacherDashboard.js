import students from '../../data/students.json'

import AslBtn from "../../components/add-subtract-level-button/AslBtn";

import styles from './teachersDashboard.module.css'

import { AuthorizationContext } from "../../context/AuthorizationContext";
import { ExercisePage } from "../index";
import { useContext, useState } from "react";

function TeacherDashboard() {

    const [ madeChoice, setMadeChoice ] = useState( false )
    const [ playtime, setPlaytime ] = useState( false )
    const [ updateStudent, setUpdateStudents ] = useState( false )

    const { activeUsername } = useContext( AuthorizationContext )

    function reset() {
        setMadeChoice( false )
        setPlaytime(false)
        setUpdateStudents(false)
    }

    return (

        <>
            { !madeChoice ?
                <>
                    <h1 className={ styles["teacher-db-header"] }>Hallo { activeUsername }, wat wil je doen?</h1>
                    <div className={ styles["teacher-db-container"] }>
                        <div className="db-outer-btn" onClick={ () => {
                            setMadeChoice( true )
                        } }>
                            <div className="db-option-btn">
                                <h3>Update Account</h3>
                            </div>
                        </div>
                        <div className="db-outer-btn" onClick={ () => {
                            setMadeChoice( true )
                            setUpdateStudents(true)
                        } }>
                            <div className="db-option-btn">
                                <h3>Leerlingen Tabel</h3>
                            </div>
                        </div>
                        <div className="db-outer-btn" onClick={ () => {
                            setMadeChoice( true )
                            setPlaytime(true)
                        } }>
                            <div className="db-option-btn">
                                <h3>Zelf Oefenen</h3>
                            </div>
                        </div>

                    </div>
                </>
                :
                <>
                    {
                        playtime ?
                            <>
                                <ExercisePage/>
                            </>
                            : updateStudent ?
                                <>
                                    <h1>Update Students (tabel component)</h1>
                                </>
                                :
                                <h1>
                                    Update account
                                </h1>
                    }
                    <div className={ styles["go-back-arrow"] } onClick={ reset }>Ga terug
                        <span>&#8678;</span>
                    </div>
                </>
            }

        </>
        // <div className={ styles["db-container"] }>
        //
        //
        //
        //     <h3>Total students: { students.length }</h3>
        //
        //     <table>
        //         <tr>
        //             <th>Naam</th>
        //             <th>Plus en min</th>
        //             <th>Keer sommen</th>
        //             <th>Deel sommen</th>
        //             <th>Klokkijken</th>
        //             <th>Geld rekenen</th>
        //             <th>Meetkunde</th>
        //         </tr>
        //         { students.map( ( student ) => {
        //             const { plusminus, clock, multiply, money, division, geometry } = student.subgroups;
        //
        //             return(
        //                 <tr>
        //                     <td>{ student.name } </td>
        //                     <td>{ plusminus }<AslBtn/> </td>
        //                     <td>{ multiply } <AslBtn /> </td>
        //                     <td>{ division } <AslBtn/> </td>
        //                     <td>{ clock } <AslBtn/> </td>
        //                     <td>{ money } <AslBtn/> </td>
        //                     <td>{ geometry } <AslBtn/> </td>
        //                 </tr>
        //             )
        //         } ) }
        //     </table>
        //
        //
        // </div>
    );
}

export default TeacherDashboard;