import { plusMinusExercise } from '../../exercises/PlusMinusExercise'
import { multiplyExercise } from '../../exercises/MultiplyExercise'
import { divideExercise } from '../../exercises/DivideExercise'
import React, { useState } from "react";

import styles from './studentDashboard.module.css'

function StudentDashboard() {

    const [ readyToPlay, setReadyToPlay ] = useState( false );
    const [ readyToStart, setReadyToStart] = useState(true)
    const [ exercises, setExercises ] = useState( [] )
    const [ level, setLevel ] = useState( 1 )
    const [ exerciseCounter, setExerciseCounter ] = useState( 0 )
    const [ goodAnswers, setGoodAnswers ] = useState( 0 )
    const [ falseAnswers, setFalseAnswers ] = useState( 0 )

    const [ pending, togglePending ] = useState( false )
    const [ userInput, setUserInput ] = useState( '' )
    const [ message, setMessage ] = useState( '' )

    // States to store generated sum(String) and answer(number)
    const [ cpuSum, setCpuSum ] = useState()
    const [ cpuAnswer, setCpuAnswer ] = useState()

    // States to toggle between selected and unselected exercises
    const [ plusMinusBtn, setPlusMinusBtn ] = useState( false )
    const [ multiplyBtn, setMultiplyBtn ] = useState( false )
    const [ divideBtn, setDivideBtn ] = useState( false )

    // States to toggle themes of buttons for selected/ unselected exercises
    const [ plusMinusBtnTheme, togglePlusMinusBtnTheme ] = useState( "unSelected-btn" )
    const [ divideBtnTheme, toggleDivideBtnTheme ] = useState( "unSelected-btn" )
    const [ multiplyBtnTheme, toggleMultiplyBtnTheme ] = useState( "unSelected-btn" )

    // This useRef is to use .focus (Autofocus is set in submitAnswer() )
    const numberInput = React.useRef( null );

    // Generates random number, depending on array length, to eventually grap element in exercises array
    function randomEx( ex ) {
        return Math.floor( Math.random() * ex.length )
    }

    function createSum() {

        // exercises is an array and given as parameter so that randomEx can use .length
        let randomExercise = exercises[randomEx( exercises )]

        let sum

        // cases are equal to all possible keys from exercises ( useState([]) )
        switch ( randomExercise ) {
            case "plusMinus":
                sum = plusMinusExercise( level )
                setCpuSum( sum[0] )
                setCpuAnswer( sum[1] )
                break;
            case "divide":
                sum = divideExercise( level )
                setCpuSum( sum[0] )
                setCpuAnswer( sum[1] )
                break;
            case "multiply":
                sum = multiplyExercise( level )
                setCpuSum( sum[0] )
                setCpuAnswer( sum[1] )
                break;
            default:
                sum = plusMinusExercise( level )
                setCpuSum( sum[0] )
                setCpuAnswer( sum[1] )
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
            setGoodAnswers( goodAnswers + 1 )
        } else {
            setMessage( "Helaas, je hebt het foute antwoord gegeven.." +
                `het antwoord had ${ cpuAnswer } moeten zijn!` )
            setFalseAnswers( falseAnswers + 1 )
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

    function addEx( ex ) {
        setExercises( [ ...exercises, ex ] )
        setReadyToStart(false)
    }

    function removeEx( ex ) {

        let index = exercises.indexOf( ex )
        exercises.splice( index, 1 )

        if (exercises.length < 1){
            setReadyToStart(true)
        }

    }

    function reset() {
        setExerciseCounter( 0 )
        setGoodAnswers( 0 )
        setFalseAnswers( 0 )
        setMessage( '' )
        setUserInput( '' )
        togglePending( false )
        setReadyToPlay( false )
        setPlusMinusBtn( false )
        setDivideBtn( false )
        setMultiplyBtn( false )
        setExercises( [] )
        togglePlusMinusBtnTheme( "unSelected-btn" )
        toggleMultiplyBtnTheme( "unSelected-btn" )
        toggleDivideBtnTheme( "unSelected-btn" )
        setReadyToStart(true)
    }


    return (
        <div className={ styles["student-db-container"] }>
            { !readyToPlay ?
                <>

                    <h1>Wat wil je oefenen?</h1>

                    <div className={ styles["ex-container"] }>
                        <button className={ styles[`${ plusMinusBtnTheme }`] }
                                onClick={ () => {
                                    if ( !plusMinusBtn ) {
                                        togglePlusMinusBtnTheme( "selected-btn" )
                                        addEx( "plusMinus" )
                                        setPlusMinusBtn( true )
                                    } else {
                                        togglePlusMinusBtnTheme( "unSelected-btn" )
                                        removeEx( "plusMinus" )
                                        setPlusMinusBtn( false )
                                    }
                                } }>
                            Plus en min
                        </button>
                        <button className={ styles[`${ multiplyBtnTheme }`] }
                                onClick={ () => {
                                    if ( !multiplyBtn ) {
                                        toggleMultiplyBtnTheme( "selected-btn" )
                                        addEx( "multiply" )
                                        setMultiplyBtn( true )
                                    } else {
                                        toggleMultiplyBtnTheme( "unSelected-btn" )
                                        removeEx( "multiply" )
                                        setMultiplyBtn( false )
                                    }
                                } }>
                            Keer- sommen
                        </button>
                        <button className={ styles[`${ divideBtnTheme }`] }
                                onClick={ () => {
                                    if ( !divideBtn ) {
                                        toggleDivideBtnTheme( "selected-btn" )
                                        addEx( "divide" )
                                        setDivideBtn( true )
                                    } else {
                                        toggleDivideBtnTheme( "unSelected-btn" )
                                        removeEx( "divide" )
                                        setDivideBtn( false )
                                    }
                                } }>
                            Deel- sommen
                        </button>

                    </div>

                    <button className={ styles["play-btn"] }
                            disabled={readyToStart}
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
                                Goede antwoorden: { goodAnswers }
                            </h1>
                            <h1>
                                Foute antwoorden: { falseAnswers }
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

export default StudentDashboard;