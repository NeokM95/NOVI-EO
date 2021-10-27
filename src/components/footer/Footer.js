import styles from "./footer.module.css"

function Footer( ) {
    return (
        <footer className={ styles["footer-container"]}>
            <p>Hier komt van alles en nog wat</p>
            <p>links naar socials</p>
            <p>inschrijven nieuwsbrief</p>
            <p>©Mensink Enterprise2021</p>
        </footer>
    );
}

export default Footer;