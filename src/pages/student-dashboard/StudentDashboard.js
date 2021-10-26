import { plusMinusExercise } from '../../exercises/PlusMinusExercise'
import { multiplyExercise } from '../../exercises/MultiplyExercise'
import { divideExercise } from '../../exercises/DivideExercise'
import React, { useState } from "react";

import styles from './studentDashboard.module.css'

function StudentDashboard() {

    const [ readyToPlay, setReadyToPlay ] = useState();
    const [ exercises, setExercises ] = useState( [] )
    const [ level, setLevel ] = useState( 1 )
    const [ exerciseCounter, setExerciseCounter ] = useState( 0 )
    const [ goodAnswers, setGoodAnswers ] = useState( 0 )
    const [ falseAnswers, setFalseAnswers ] = useState( 0 )

    const [ cpuSum, setCpuSum ] = useState()
    const [ cpuAnswer, setCpuAnswer ] = useState()

    const [ pending, togglePending ] = useState( false )
    const [ userInput, setUserInput ] = useState( '' )
    const [ message, setMessage ] = useState( '' )

    const [ plusMinusBtn, setPlusMinusBtn ] = useState( false )
    const [ multiplyBtn, setMultiplyBtn ] = useState( false )
    const [ divideBtn, setDivideBtn ] = useState( false )

    const numberInput = React.useRef( null );

    function createSum() {

        let randomExercise = exercises[randomEx(exercises)]

        console.log(randomExercise)

        let sum

        switch ( randomExercise ){
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

    function randomEx(ex){
        return Math.floor(Math.random()*ex.length)
    }

    function submitAnswer( e ) {

        e.preventDefault()

        togglePending( true )
        setExerciseCounter( exerciseCounter + 1 )

        if ( cpuAnswer.toString() === userInput ) {
            setMessage( "Goedzo, je hebt het juiste antwoord gegeven!" )
            setGoodAnswers( goodAnswers + 1 )
        } else {
            setMessage( "Helaas, je hebt het foute antwoord gegeven.." +
                `het antwoord had ${ cpuAnswer } moeten zijn!` )
            setFalseAnswers( falseAnswers + 1 )
        }


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

    function reset() {
        setExerciseCounter( 0 )
        setGoodAnswers( 0 )
        setFalseAnswers( 0 )
        setMessage( '' )
        setUserInput( '' )
        togglePending( false )
    }

    return (
        <div className={ styles["student-db-container"] }>
            { !readyToPlay ?
                <>

                    <h1>Wat wil je oefenen?</h1>

                    <div className={ styles["ex-container"] }>
                        <button className={ styles["ex-btn"] }
                                disabled={ plusMinusBtn }
                                onClick={ () => {
                                    setPlusMinusBtn( true )
                                    setExercises( [ "plusMinus", ...exercises ] )
                                } }>
                            Plus en min
                        </button>
                        <button className={ styles[`ex-btn`] }
                                disabled={ multiplyBtn }
                                onClick={ () => {
                                    setMultiplyBtn( true )
                                    setExercises( [ "multiply", ...exercises ] )
                                } }>
                            Keer- sommen
                        </button>
                        <button className={ styles["ex-btn"] }
                                disabled={ divideBtn }
                                onClick={ () => {
                                    setDivideBtn( true )
                                    setExercises( [ "divide", ...exercises ] )
                                } }>
                            Deel- sommen
                        </button>
                    </div>

                    {/*<h3>Gekozen level: { level } </h3>*/ }
                    {/*<div className={ styles["level-btn-container"] }>*/ }
                    {/*    <button className={ styles["level-btn"] } onClick={ () => setLevel( 1 ) }>level 1</button>*/ }
                    {/*    <button className={ styles["level-btn"] } onClick={ () => setLevel( 2 ) }>level 2</button>*/ }
                    {/*    <button className={ styles["level-btn"] } onClick={ () => setLevel( 3 ) }>level 3</button>*/ }
                    {/*</div>*/ }
                    <button className={ styles["play-btn"] } onClick={ () => {
                        setReadyToPlay( true )
                        createSum()
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