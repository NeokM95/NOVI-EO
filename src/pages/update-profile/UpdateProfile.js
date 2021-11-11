import styles from "./updateProfile.module.css"
import LevelBtn from "../../components/level-button/LevelBtn";


function UpdateProfile( { currentProfile } ) {

    return (
        <>
            <div className={ styles["update-profile-container"] }>
                <label htmlFor="">
                    Gebruikersnaam:
                    <input
                        type="text"
                        value={ currentProfile.username }
                        disabled
                    />
                </label>
                <label htmlFor="">
                    Email:
                    <input
                        type="text"
                        value={ currentProfile.email }
                        disabled
                    />
                </label>
                Niveaus:
                <div className={ styles["level-container"] }>
                    <LevelBtn title="Plus Min" level={ currentProfile.plusMinus }/>
                    <LevelBtn title="Keer Sommen" level={ currentProfile.multiply }/>
                    <LevelBtn title="Deel Sommen" level={ currentProfile.divide }/>
                </div>

                <div className={ styles["button-container"] }>
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