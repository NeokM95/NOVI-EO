export function divideExercise(level){
    switch ( level ) {
        case 1:
            return divideLevelOne()
        case 2:
            return divideLevelTwo()
        case 3:
            return divideLevelThree()
        default:
            return divideLevelOne()
    }
}

function divide(numA, numB){

    let sum = `${numA} / ${numB}`
    let answer = numA / numB

    return [ sum, answer ]

}

function divideLevelOne(){
    let numberA = Math.ceil(Math.random()*10)
    let numberB = Math.ceil(Math.random()*10)

    while ((numberA/numberB) % 1 !== 0){
        numberA = Math.ceil(Math.random()*10)
        numberB = Math.ceil(Math.random()*10)
    }

    return divide(numberA, numberB)

}

function divideLevelTwo(){
    let numberA = Math.ceil(Math.random()*100)
    let numberB = Math.ceil(Math.random()*10)

    while ((numberA/numberB) % 1 !== 0){
        numberA = Math.ceil(Math.random()*100)
        numberB = Math.ceil(Math.random()*10)
    }

    return divide(numberA, numberB)

}

function divideLevelThree(){
    let numberA = Math.ceil(Math.random()*100)
    let numberB = Math.ceil(Math.random()*100)

    while ((numberA/numberB) % 1 !== 0){
        numberA = Math.ceil(Math.random()*100)
        numberB = Math.ceil(Math.random()*100)
    }

    return divide(numberA, numberB)

}
