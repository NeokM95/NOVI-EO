import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg"

import styles from './homeNaviagtion.module.css'

function HomeNavigation() {
    return (
        <nav className={ styles["navbar-container"] }>

            <div className={styles["title-bar"]}>
                <Logo className={ styles["logo-img"] }/>
                <h1>Project titel</h1>
            </div>

            <div className={ styles["link-container"] }>
                <NavLink exact to="/" className={ styles["nav-link"] }
                         activeClassName={ styles["active-nav-link"] }>Home</NavLink>
                <NavLink to="/about-us" className={ styles["nav-link"] } activeClassName={ styles["active-nav-link"] }>About
                    us</NavLink>
                <NavLink to="/FAQ" className={ styles["nav-link"] }
                         activeClassName={ styles["active-nav-link"] }>FAQ</NavLink>
                <NavLink to="/login" className={ styles["nav-link"] }
                         activeClassName={ styles["active-nav-link"] }>Login</NavLink>
            </div>
        </nav>
    );
}

export default HomeNavigation;