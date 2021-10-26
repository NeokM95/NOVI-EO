import styles from './aslbtn.module.css'

function AslBtn()  {

    return (
        <div className={styles["asl-btn-container"]}>
            <button className={styles["asl-btn"]}>+</button>
            <button className={styles["asl-btn"]}>-</button>
        </div>
    );
}

export default AslBtn;