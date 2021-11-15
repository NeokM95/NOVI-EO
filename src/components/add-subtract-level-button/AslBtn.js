import styles from './aslbtn.module.css'

function AslBtn({user, subject})  {

    async function increaseLevel(){

        try {

        }catch(e){
            console.error(e)
        }

    }

    async function decreaseLevel(){

        try {

        }catch(e){
            console.error(e)
        }

    }


    return (
        <div className={styles["asl-btn-container"]}>
            <button className={styles["asl-btn"]} onClick={increaseLevel}>+</button>
            <button className={styles["asl-btn"]} onClick={decreaseLevel}>-</button>
        </div>
    );
}

export default AslBtn;