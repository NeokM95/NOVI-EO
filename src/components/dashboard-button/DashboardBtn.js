import styles from './dashboardBtn.module.css'

function DashboardBtn( { btnTitle, onClick } ) {

    return (
        <div className={ styles["db-outer-btn"] } onClick={onClick}>
            <div className={ styles["db-option-btn"] }>
                <h3>{ btnTitle }</h3>
            </div>
        </div>
    );
}

export default DashboardBtn;