import styles from "./updateProfile.module.css"
import LevelBtn from "../../components/level-button/LevelBtn";

function UpdateProfile( ) {
    return (
        <>
            <div className={styles["update-profile-container"]}>
                <label htmlFor="">
                    Gebruikersnaam:
                    <input
                        type="text"
                        value="Koen"
                        disabled
                    />
                </label>
                <label htmlFor="">
                    Email:
                    <input
                        type="text"
                        value="koenm@ChiefCount.nl"
                        disabled
                    />
                </label>
                Niveaus:
                <div className={styles["level-container"]}>
                    <LevelBtn title="Plus Min" level="2"/>
                    <LevelBtn title="Keer Sommen" level="2"/>
                    <LevelBtn title="Deel Sommen" level="3"/>
                </div>

                <div className={styles["button-container"]}>
                    <button>
                        Wijzig Wachtwoord
                    </button>
                    <button>
                        Wijzig Email
                    </button>
                </div>

            </div>
        </>
    );
}

export default UpdateProfile;