import styles from './dashboardHeader.module.css'

function DashboardHeader( { name } ) {

    const lowercaseName = name
    const uppercasedName = lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1)

    return (
        <h1 className={ styles["db-header"] }>Hallo { uppercasedName }, wat wil je doen?</h1>
    );
}

export default DashboardHeader;