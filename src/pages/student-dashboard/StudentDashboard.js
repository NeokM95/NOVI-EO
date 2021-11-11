import { useContext, useState } from "react";

import { ExercisePage } from "../index";

import DashboardBtn from "../../components/dashboard-button/DashboardBtn";
import DashboardHeader from "../../components/dashboard-header/DashboardHeader";
import BackToDashboardArrow from "../../components/back-to-db-arrow/BackToDashboardArrow";

import { AuthorizationContext } from "../../context/AuthorizationContext";

import styles from "./studentDashboard.module.css"
import UpdateProfile from "../update-profile/UpdateProfile";

function StudentDashboard() {

    const [ madeChoice, setMadeChoice ] = useState( false )
    const [ playtime, setPlaytime ] = useState( false )

    const { activeUsername } = useContext( AuthorizationContext )

    function setPractice() {
        setPlaytime( true )
        setMadeChoice( true )
    }

    function setUpdateAccount() {
        setMadeChoice( true )
    }

    function reset() {
        setMadeChoice( false )
        setPlaytime( false )
    }

    return (
        <>

            { !madeChoice ?
                <>
                    <DashboardHeader name={ activeUsername }/>
                    <div className={ styles["student-db-btn-container"] }>
                        <DashboardBtn btnTitle="Update Account" onClick={ setUpdateAccount }/>
                        <DashboardBtn btnTitle="Oefenen" onClick={ setPractice }/>
                    </div>
                </>
                :
                <>
                    { playtime ?
                        <ExercisePage/>
                        :
                        <UpdateProfile/>
                    }
                    <BackToDashboardArrow onClick={ reset }/>
                </>
            }
        </>
    )
}

export default StudentDashboard;