import { useContext } from "react";

import LevelBtn from "../../components/level-button/LevelBtn";

import styles from "./updateProfile.module.css"

import { ActiveUserContext } from "../../context/ActiveUserContext";

function UpdateProfile( ) {

    const { activeUserDetails } = useContext( ActiveUserContext )

    return (
        <>
            <div className={ styles["update-profile-container"] }>
                <label htmlFor="">
                    Gebruikersnaam:
                    <input
                        type="text"
                        value={ activeUserDetails.username }
                        disabled
                    />
                </label>
                <label htmlFor="">
                    Email:
                    <input
                        type="text"
                        value={ activeUserDetails.email }
                        disabled
                    />
                </label>
                Niveaus:
                <div className={ styles["level-container"] }>
                    <LevelBtn title="Plus Min" level={ activeUserDetails.plusMinus }/>
                    <LevelBtn title="Keer Sommen" level={ activeUserDetails.multiply }/>
                    <LevelBtn title="Deel Sommen" level={ activeUserDetails.divide }/>
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