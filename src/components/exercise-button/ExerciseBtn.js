import React from 'react';
import styles from "./exerciseBtn.module.css";

function ExerciseBtn( { children, onClick, style} ) {

    return (
        <button className={ styles[`${ style }`] }
                onClick={ onClick }>
            { children }
        </button>
    );
}

export default ExerciseBtn;