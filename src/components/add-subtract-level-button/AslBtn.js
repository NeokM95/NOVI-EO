import styles from './aslbtn.module.css'

function AslBtn({username, subject})  {

    async function increaseLevel(){
        console.log(username + " " + subject)
    }

    async function decreaseLevel(){
        console.log(username + " " + subject)
    }


    return (
        <div className={styles["asl-btn-container"]}>
            <button className={styles["asl-btn"]} onClick={increaseLevel}>+</button>
            <button className={styles["asl-btn"]} onClick={decreaseLevel}>-</button>
        </div>
    );
}

export default AslBtn;