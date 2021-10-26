export function plusMinusExercise(level){
    switch ( level ) {
        case 1:
            return plusMinusLevelOne()
        case 2:
            return plusMinusLevelTwo()
        case 3:
            return plusMinusLevelThree()
        default:
            return plusMinusLevelOne()
    }
}

// Logic toevoegen zodat uitkomst nooit < 0 kan zijn.


function plusMinus(numA, numB){
    let sum
    let answer
    let sumAndAnswer = []

    if ( Math.floor( Math.random() * 2 ) === 1){
        sum = `${numA} - ${numB}`
        answer = (numA - numB)

    } else {
        sum = `${numA} + ${numB}`
        answer = (numA + numB)
    }

    sumAndAnswer.push(sum, answer)

    return sumAndAnswer

}

function plusMinusLevelOne(){
    let numberA = Math.ceil(Math.random()*10)
    let numberB = Math.ceil(Math.random()*10)

    return plusMinus(numberA, numberB)
}

function plusMinusLevelTwo(){
    let numberA = Math.ceil(Math.random()*100)
    let numberB = Math.ceil(Math.random()*100)

    return plusMinus(numberA, numberB)
}

function plusMinusLevelThree(){
    let numberA = Math.ceil(Math.random()*1000)
    let numberB = Math.ceil(Math.random()*1000)

    return plusMinus(numberA, numberB)
}
