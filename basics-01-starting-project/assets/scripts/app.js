// alert('This works!');
//Assignment2
// function firstAlert() {
//     alert("hello");
// }
// function secondAlert(name) {
//     alert(name);
// }

// firstAlert();
// secondAlert("chris");

// task3Element.addEventListener('click', firstAlert);

// s1 = "hi";
// s2 = "hey";
// s3 = "hello";
// function threeParam(s1, s2, s3) {
//     return `${s1} ${s2} ${s3}`;
// }

// alert(threeParam(s1, s2, s3));

const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

//Gets input from input field
function getUserNumberInput() {
    return +userInput.value;
}

//Generates and writes calculation log
function createAndWriteOutput(operator, resultBefore, calcNum) {
    const calcDescription = `${resultBefore} ${operator} ${calcNum}`;
    outputResult(currentResult, calcDescription);
}

function writeToLog(operation, prevResult, operationNum, newResult) {
    const logEntry = {
        operation: operation,
        prevResult: prevResult,
        number: operationNum,
        result: newResult
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}

function calculateResult(calculationType)  {
    if (calculationType !== 'ADD' && 
        calculationType !== 'SUBTRACT' && 
        calculationType !== 'MULTIPLY' && 
        calculationType !== 'DIVIDE' ||
        !enteredNum) {
            return; 
    }

    const enteredNum = getUserNumberInput(); //same as parseInt(userInput.value)
    const initialResult = currentResult;
    let mathOperator;
    if (calculationType === 'ADD') {
        currentResult += enteredNum;
        mathOperator = '+';
    }
    else if (calculationType === 'SUBTRACT') {
        currentResult -= enteredNum;
        mathOperator = '-';
    }
    else if (calculationType === 'MULTIPLY') {
        currentResult *= enteredNum;
        mathOperator = '*';
    }
    else if (calculationType === 'DIVIDE') {
        currentResult /= enteredNum;
        mathOperator = '/';
    }

    createAndWriteOutput(mathOperator, initialResult, currentResult);
    writeToLog(calculationType, initialResult, enteredNum, currentResult);
}

function add() {
    calculateResult('ADD');
}

function subtract() {
    calculateResult('SUBTRACT');
}

function multiply() {
    calculateResult('MULTIPLY');
}

function divide() {
    calculateResult('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);


