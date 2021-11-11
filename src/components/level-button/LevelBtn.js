import styles from "./levelBtn.module.css"

function LevelBtn({title, level}) {
    return (
        <div className={styles["level-btn"]}>
            <h6>{title}</h6>
            <h3>{level}</h3>
        </div>
    );
}

export default LevelBtn;