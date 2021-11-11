import students from '../../data/students.json'

import AslBtn from "../../components/add-subtract-level-button/AslBtn";

import styles from './teachersDashboard.module.css'

import { AuthorizationContext } from "../../context/AuthorizationContext";
import { ExercisePage } from "../index";
import { useContext, useState } from "react";
import DashboardBtn from "../../components/dashboard-button/DashboardBtn";
import DashboardHeader from "../../components/dashboard-header/DashboardHeader";
import BackToDashboardArrow from "../../components/back-to-db-arrow/BackToDashboardArrow";
import UpdateProfile from "../update-profile/UpdateProfile";

function TeacherDashboard() {

    const [ madeChoice, setMadeChoice ] = useState( false )
    const [ playtime, setPlaytime ] = useState( false )
    const [ studentOverview, setStudentOverview ] = useState( false )

    const { activeUsername } = useContext( AuthorizationContext )

    function setPractice(){
        setMadeChoice(true)
        setPlaytime(true)
    }

    function setStudentOverviewPage(){
        setMadeChoice(true)
        setStudentOverview(true)
    }

    function setUpdateAccount() {
        setMadeChoice( true )
    }

    function reset() {
        setMadeChoice( false )
        setPlaytime( false )
        setStudentOverview( false )
    }

    return (

        <>
            { !madeChoice ?
                <>
                    <DashboardHeader name={activeUsername}/>
                    <div className={ styles["teacher-db-btn-container"] }>
                        <DashboardBtn btnTitle="Update Account" onClick={setUpdateAccount}/>
                        <DashboardBtn btnTitle="Leerling Overzicht" onClick={setStudentOverviewPage}/>
                        <DashboardBtn btnTitle="Zelf Oefenen" onClick={setPractice}/>
                    </div>
                </>
                :
                <>
                    { playtime ?
                            <>
                                <ExercisePage/>
                            </>
                            : studentOverview ?
                                <>
                                    <h1>Update Students (tabel component)</h1>
                                </>
                                :
                                <UpdateProfile/>
                    }
                    <BackToDashboardArrow onClick={reset}/>
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