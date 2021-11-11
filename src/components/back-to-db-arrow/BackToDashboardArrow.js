import styles from './backToDashboardArrow.module.css'

function BackToDashboardArrow({onClick}) {

    return (
        <div className={ styles["go-back-arrow"] } onClick={onClick}>Ga terug
            <span>&#8678;</span>
        </div>
    );
}

export default BackToDashboardArrow;