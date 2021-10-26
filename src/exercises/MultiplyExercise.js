export function multiplyExercise(level){
    switch ( level ) {
        case 1:
            return multiplyLevelOne()
        case 2:
            return multiplyLevelTwo()
        case 3:
            return multiplyLevelThree()
        default:
            return multiplyLevelOne()
    }
}

function multiply(numA, numB){

    let sum = `${numA} x ${numB}`
    let answer = numA * numB
    return [ sum, answer ]

}

function multiplyLevelOne(){
    let numberA = Math.ceil(Math.random()*10)
    let numberB = Math.ceil(Math.random()*10)

    return multiply(numberA, numberB)
}

function multiplyLevelTwo(){
    let numberA = Math.ceil(Math.random()*10)
    let numberB = Math.ceil(Math.random()*100)

    return multiply(numberA, numberB)
}

function multiplyLevelThree(){
    let numberA = Math.ceil(Math.random()*100)
    let numberB = Math.ceil(Math.random()*100)

    return multiply(numberA, numberB)
}