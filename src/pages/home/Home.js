import choose from "../../assets/home-images/kies.PNG"
import practice from "../../assets/home-images/oefen.PNG"
import result from "../../assets/home-images/resultaat.PNG"

import styles from './home.module.css'

function Home() {
    return (
        <>
            <header className={ styles["header-img"] }>

                <div className={ styles["header-txt"]}>
                    <h1>Hele pakkende header</h1>
                    <p>
                        Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. At consectetur delectus dicta eos est et facilis,
                        illo itaque maiores nisi non nostrum recusandae reiciendis soluta sunt ut voluptatem.
                        Accusantium cum minus nisi officiis sequi. Asperiores deserunt dignissimos,
                        dolor doloremque ducimus fugit harum inventore laboriosam molestias mollitia
                        odio porro quas quidem quisquam quo rem totam voluptas voluptates?
                        Architecto assumenda delectus fugiat laboriosam nisi obcaecati quae
                        qui quo soluta totam?
                    </p>
                </div>

            </header>

            {/*// Nog even uitzoeken hoe dit mooier kan*/}

            <body className={ styles["main-container"]}>

                <div className={ styles["main-info"]}>
                    <img src={ choose } alt="choose exercises" className={styles["main-pictures"]}/>
                    <div className={styles["main-text-odd"]}>
                        <h1>Kies je Sommen</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            A ab ad assumenda blanditiis consequatur debitis ex exercitationem labore,
                            maiores natus nostrum reprehenderit sed sit unde!
                        </p>
                    </div>
                </div>

                <div className={ styles["main-info"]}>
                    <div className={styles["main-text-even"]}>
                        <h1>Maak de opgave</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            A ab ad assumenda blanditiis consequatur debitis ex exercitationem labore,
                            maiores natus nostrum reprehenderit sed sit unde!
                        </p>
                    </div>
                    <img src={ practice } alt="practice" className={styles["main-pictures"]}/>
                </div>

                <div className={ styles["main-info"]}>
                    <img src={ result } alt="result" className={styles["main-pictures"]}/>
                    <div className={styles["main-text-odd"]}>
                        <h1>Bekijk het resultaat</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            A ab ad assumenda blanditiis consequatur debitis ex exercitationem labore,
                            maiores natus nostrum reprehenderit sed sit unde!
                        </p>
                    </div>
                </div>

            </body>

        </>
    );
}

export default Home;