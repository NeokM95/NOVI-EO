import { useContext } from "react";

import { AuthorizationContext } from "../../context/AuthorizationContext";
import { AdminDashboard, StudentDashboard, TeacherDashboard } from "../../pages";
import { Redirect, Route, Switch } from "react-router-dom";

import styles from './authorized.module.css'

function AuthorizedSection() {

    const { logout, isAuthorized, isStudent, isTeacher, isAdmin } = useContext( AuthorizationContext )

    return (
        <div>
            <section className={ isAuthorized && styles[ "auth-container"] }>
                <Switch>
                    <Route path="/student-dashboard">
                        { isAuthorized  && isStudent? <StudentDashboard/> : <Redirect to="/login"/> }
                    </Route>
                    <Route path="/teacher-dashboard">
                        { isAuthorized && isTeacher ? <TeacherDashboard/> : <Redirect to="/login"/> }
                    </Route>
                    <Route path="/admin-dashboard">
                        { isAuthorized && isAdmin ? <AdminDashboard/> : <Redirect to="/login"/> }
                    </Route>
                </Switch>
                { isAuthorized && <button className={ styles["logout-btn"] }onClick={ logout }>log uit</button> }
            </section>
        </div>
    );
}

export default AuthorizedSection;