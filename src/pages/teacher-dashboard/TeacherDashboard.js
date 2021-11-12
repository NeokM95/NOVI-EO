import { useContext, useState } from "react";

import { ExercisePage, StudentOverview, UpdateProfile } from "../index";

import DashboardBtn from "../../components/dashboard-button/DashboardBtn";
import DashboardHeader from "../../components/dashboard-header/DashboardHeader";
import BackToDashboardArrow from "../../components/back-to-db-arrow/BackToDashboardArrow";

import { ActiveUserContext } from "../../context/ActiveUserContext";

import styles from './teachersDashboard.module.css'

function TeacherDashboard() {

    const [ madeChoice, setMadeChoice ] = useState( false )
    const [ playtime, setPlaytime ] = useState( false )
    const [ studentOverview, setStudentOverview ] = useState( false )

    const { activeUserDetails } = useContext( ActiveUserContext )

    function setPractice() {
        setMadeChoice( true )
        setPlaytime( true )
    }

    function setStudentOverviewPage() {
        setMadeChoice( true )
        setStudentOverview( true )
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
                    <DashboardHeader name={ activeUserDetails.username }/>
                    <div className={ styles["teacher-db-btn-container"] }>
                        <DashboardBtn btnTitle="Update Account" onClick={ setUpdateAccount }/>
                        <DashboardBtn btnTitle="Leerling Overzicht" onClick={ setStudentOverviewPage }/>
                        <DashboardBtn btnTitle="Zelf Oefenen" onClick={ setPractice }/>
                    </div>
                </>
                :
                <>
                    { playtime ?
                        <>
                            <ExercisePage/>
                        </>
                        : studentOverview ?
                            <StudentOverview/>
                            :
                            <UpdateProfile/>
                    }
                    <BackToDashboardArrow onClick={ reset }/>
                </>
            }
        </>

    );
}

export default TeacherDashboard;