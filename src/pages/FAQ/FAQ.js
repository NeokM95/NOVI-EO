import styles from './FAQ.module.css'
import { useEffect, useState } from "react";

// todo: `change '+' to '-' and back by (un)folding.`


function Faq() {

    const [ questionObjects, setQuestionObjects ] = useState( [] )

    // empty array to push all question objects to before you set the questions[] as a whole to questionObjects[]
    let questions = []

    useEffect( () => {

        // push 10 dummy question into questions[]
        for ( let i = 0; i < 10; i++ ) {
            questions.push( {
                index: i,
                question: "Vraag " + (i + 1),
                answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                    "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
                    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                isActive: false
            } )
        }

        // after for loop set questions as new value of questionObjects
        setQuestionObjects( [ ...questions ] )

    }, [] )

    function changeData(index){

        // todo: Nova vragen of ik in de buurt zit, of dat onderstaande methode de juiste is.

        // setIsActive([...questionObjects, questionObjects[index] = {
        //     ...questionObjects[index],
        //     questionObjects: true
        // }])


        // store state in tmp array
        let tmpArray = [...questionObjects]

        // check questionObjects boolean and toggle value
        tmpArray[index].isActive = tmpArray[index].isActive !== true;

        // set tmpArray as new value to questionObjects
        setQuestionObjects([...tmpArray])

    }


    return (

        <div className={ styles["according-body"] }>
            <div className={ styles["accordion"] }>
                <h1 className={ styles["title"] }>FAQ</h1>
                <hr/>
                { questionObjects.map( ( el ) => {
                    return (
                        <>
                            <div className={ styles["container"] } onClick={ () => {
                                changeData(el.index)
                            }}>
                                <div className={ styles["label"] }>{ el.question }</div>
                                <div
                                    // this ternary operator checks the questionObjects boolean value of each object in questionObjects[] independently.
                                    className={ !questionObjects[el.index].isActive ? styles["content"] : styles["content active"]}
                                >
                                    { el.answer }
                                </div>
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