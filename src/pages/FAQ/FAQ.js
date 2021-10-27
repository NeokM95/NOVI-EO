import styles from './FAQ.module.css'

function Faq() {

    let questions = []

    for ( let i = 0; i < 10; i++ ) {
        questions.push( {
            index: i+1,
            question: "Vraag " + i,
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
                "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        } )
    }

    return (

        <div className={ styles["according-body"] }>
            <div className={ styles["accordion"] }>
                <h1 className={styles["title"]}>FAQ</h1>
                <hr/>
                { questions.map( ( question ) => {
                    return (
                        <>
                            <div className={ styles["container"] }>
                                <div className={ styles["label"] }>{ question.question }</div>
                                <div className={ styles["content"] }>{ question.answer }</div>
                            </div>
                            <hr/>
                        </>
                    )
                } ) }
            </div>
        </div>

    );
}

export default Faq;