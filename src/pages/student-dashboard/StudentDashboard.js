import styles from "./studentDashboard.module.css"
import { useContext, useState } from "react";

import { AuthorizationContext } from "../../context/AuthorizationContext";
import { ExercisePage } from "../index";

function StudentDashboard() {

    const [ madeChoice, setMadeChoice ] = useState( false )
    const [ playtime, setPlaytime ] = useState( false )

    const { activeUsername } = useContext( AuthorizationContext )

    function reset() {
        setMadeChoice( false )
        setPlaytime( false )
    }

    return (
        <>

            { !madeChoice ?
                <>
                    <h1 className={ styles["student-db-header"] }>Hallo { activeUsername }, wat wil je doen?</h1>
                    <div className={ styles["student-db-container"] }>
                        <div className="db-outer-btn" onClick={ () => {
                            setMadeChoice( true )
                        } }>
                            <div className="db-option-btn">
                                <h3>Update Account</h3>
                            </div>
                        </div>
                        <div className="db-outer-btn" onClick={ () => {
                            setMadeChoice( true )
                            setPlaytime( true )
                        } }>
                            <div className="db-option-btn">
                                <h3>Oefenen</h3>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    { playtime ?
                        <>
                            <ExercisePage/>
                        </>
                        :

                        <>
                            <h1>update profiel</h1>
                        </>
                    }
                    <div className={ styles["go-back-arrow"] } onClick={ reset }>Ga terug
                        <span>&#8678;</span>
                    </div>
                </>
            }
        </>
    )
}

export default StudentDashboard;