import { plusMinusExercise, divideExercise, multiplyExercise } from "../../exercises";
import React, { useContext, useEffect, useState } from "react";

import styles from './exercisePage.module.css'
import ExerciseBtn from "../../components/exercise-button/ExerciseBtn";

import { ActiveUserContext } from "../../context/ActiveUserContext";

function ExercisePage() {

    const { activeUserDetails } = useContext( ActiveUserContext )

    const [ levels, setLevels] = useState({
        plusMinus: 1,
        multiply: 1,
        divide: 1
    })

    // readyToPlay === true after player hits 'play'-button
    const [ readyToPlay, setReadyToPlay ] = useState( false );

    // Array to push chosen exercises to
    const [ exercises, setExercises ] = useState( [] )

    // readyToStart === true if exercises.length > 0
    const [ readyToStart, setReadyToStart ] = useState( false );

    // States to store different counters.
    const [ exerciseCounter, setExerciseCounter ] = useState( 0 )
    const [ goodAnswerCounter, setGoodAnswerCounter ] = useState( 0 )
    const [ falseAnswerCounter, setFalseAnswerCounter ] = useState( 0 )

    // State toggles to disable input field + btn during pending.
    const [ pending, togglePending ] = useState( false )

    // Store user input to compare with cpuAnswer
    const [ userInput, setUserInput ] = useState( '' )

    // Set message depending on good/ false answer.
    const [ message, setMessage ] = useState( '' )

    // States to store generated sum(String) and answer(number)
    const [ cpuSum, setCpuSum ] = useState()
    const [ cpuAnswer, setCpuAnswer ] = useState()

    // States to toggle between selected and unselected button style.
    const [ plusMinusBtn, setPlusMinusBtn ] = useState( false )
    const [ multiplyBtn, setMultiplyBtn ] = useState( false )
    const [ divideBtn, setDivideBtn ] = useState( false )

    // This useRef is to use .focus (Autofocus is set in submitAnswer() )
    const numberInput = React.useRef( null );

    useEffect(() =>{

        setLevels({
            plusMinus: activeUserDetails.plusMinus,
            multiply: activeUserDetails.multiply,
            divide: activeUserDetails.divide
        })

    },[])

    function addExercise( ex ) {
        setExercises( [ ...exercises, ex ] )
        setReadyToStart( true )
    }

    function removeExercise( ex ) {

        let index = exercises.indexOf( ex )
        exercises.splice( index, 1 )

        if ( exercises.length < 1 ) {
            setReadyToStart( false )
        }

    }

    function randomExerciseGenerator( ex ) {
        return Math.floor( Math.random() * ex )
    }

    function createSum() {

        // exercises is the array which stores the by user chosen exercises.
        let randomExercise = exercises[randomExerciseGenerator( exercises.length )]

        let generatedSumArray

        // cases are equal to all possible keys from exercises([])
        switch ( randomExercise ) {
            case "plusMinus":
                generatedSumArray = plusMinusExercise( levels.plusMinus )
                setCpuSum( generatedSumArray[0] )
                setCpuAnswer( generatedSumArray[1] )
                break;
            case "divide":
                generatedSumArray = divideExercise( levels.divide )
                setCpuSum( generatedSumArray[0] )
                setCpuAnswer( generatedSumArray[1] )
                break;
            case "multiply":
                generatedSumArray = multiplyExercise( levels.multiply )
                setCpuSum( generatedSumArray[0] )
                setCpuAnswer( generatedSumArray[1] )
                break;
            default:
                generatedSumArray = plusMinusExercise( levels.plusMinus )
                setCpuSum( generatedSumArray[0] )
                setCpuAnswer( generatedSumArray[1] )
                break;
        }

    }

    function submitAnswer( e ) {

        e.preventDefault()

        togglePending( true )
        setExerciseCounter( exerciseCounter + 1 )

        // check if userInput equals outcome of the sum.
        if ( cpuAnswer.toString() === userInput ) {
            setMessage( "Goedzo, je hebt het juiste antwoord gegeven!" )
            setGoodAnswerCounter( goodAnswerCounter + 1 )
        } else {
            setMessage( "Helaas, je hebt het foute antwoord gegeven.." +
                `het antwoord had ${ cpuAnswer } moeten zijn!` )
            setFalseAnswerCounter( falseAnswerCounter + 1 )
        }

        // timeout is necessary to give the user some time to read the message,
        // in the meanwhile input field and submit button are disabled.
        if ( exerciseCounter < 9 ) {
            setTimeout( () => {
                createSum()
                setMessage( '' )
                setUserInput( '' )
                togglePending( false )
                numberInput.current.focus()
            }, 500 )
        }
    }

    // these toggleFunctions toggles btn-style + presence in exercise array
    function togglePlusMinus() {
        setPlusMinusBtn( !plusMinusBtn )

        if ( !plusMinusBtn ) {
            addExercise( "plusMinus" )
        } else {
            removeExercise( "plusMinus" )
        }

    }
    function toggleMultiply() {
        setMultiplyBtn( !multiplyBtn )

        if ( !multiplyBtn ) {
            addExercise( "multiply" )
        } else {
            removeExercise( "multiply" )
        }

    }
    function toggleDivide() {
        setDivideBtn( !divideBtn )

        if ( !divideBtn ) {
            addExercise( "divide" )
        } else {
            removeExercise( "divide" )
        }

    }

    function reset() {
        setExerciseCounter( 0 )
        setGoodAnswerCounter( 0 )
        setFalseAnswerCounter( 0 )
        setMessage( '' )
        setUserInput( '' )
        togglePending( false )
        setReadyToPlay( false )
        setPlusMinusBtn( false )
        setDivideBtn( false )
        setMultiplyBtn( false )
        setReadyToStart( false )
        setExercises( [] )
    }

    const lowercaseName = activeUserDetails.username
    const uppercasedName = lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1)

    return (
        <div className={ styles["student-db-container"] }>
            { !readyToPlay ?
                <>

                    <h1>{uppercasedName}, wat wil je oefenen?</h1>

                    <div className={ styles["exercise-container"] }>
                        <ExerciseBtn style={ plusMinusBtn ? "selected-btn" : "unSelected-btn" }
                                     onClick={ togglePlusMinus }>
                            Plus en Min
                        </ExerciseBtn>
                        <ExerciseBtn style={ multiplyBtn ? "selected-btn" : "unSelected-btn" }
                                     onClick={ toggleMultiply }>
                            Keer- Sommen
                        </ExerciseBtn>
                        <ExerciseBtn style={ divideBtn ? "selected-btn" : "unSelected-btn" }
                                     onClick={ toggleDivide }>
                            Deel- Sommen
                        </ExerciseBtn>
                    </div>

                    <button className={ styles["play-btn"] }
                            disabled={ !readyToStart }
                            onClick={ () => {
                                setReadyToPlay( true )
                                createSum()
                                console.log( exercises )
                            } }>SPELEN
                    </button>
                </>
                :
                <>
                    { exerciseCounter < 10 ?
                        <>
                            <div className={ styles["ex-counter-container"] }>
                                <h1>{ exerciseCounter } / 10</h1>
                            </div>

                            <div className={ styles["sum-container"] }>
                                <h4>{ cpuSum }</h4>
                            </div>

                            <form className={ styles["input-container"] } onSubmit={ submitAnswer }>
                                <input
                                    type="number"
                                    value={ userInput }
                                    placeholder="Typ hier jouw antwoord"
                                    disabled={ pending }
                                    autoFocus
                                    ref={ numberInput }
                                    onChange={ ( e ) => {
                                        e.preventDefault()
                                        setUserInput( e.target.value )
                                    } }
                                />
                                <button
                                    className={ styles["submit-btn"] }
                                    type="submit"
                                    disabled={ pending }>
                                    Verstuur Antwoord
                                </button>
                            </form>
                            <div className={ styles["msg-box"] }>
                                <h4>{ message }</h4>
                            </div>
                        </>
                        :
                        <div>
                            <h1>
                                Goede antwoorden: { goodAnswerCounter }
                            </h1>
                            <h1>
                                Foute antwoorden: { falseAnswerCounter }
                            </h1>

                            <button onClick={ reset }>
                                Opnieuw proberen
                            </button>
                        </div>
                    }
                </>
            }
        </div>
    );
}

export default ExercisePage;