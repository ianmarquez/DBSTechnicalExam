"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const Canvas_1 = __importDefault(require("./models/Canvas"));
const safe_1 = __importDefault(require("colors/safe"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let currentCanvas;
const handleError = (message) => {
    console.log(safe_1.default.red(`${message} \n`));
};
const createCanvas = (coordinate) => {
    try {
        currentCanvas = new Canvas_1.default(coordinate);
        currentCanvas.printCanvas();
    }
    catch (err) {
        handleError(err.message);
    }
};
const createLine = (start, destination) => {
    try {
        if (!currentCanvas)
            throw new Error('Canvas is not yet existing!');
        currentCanvas.createLine(start, destination);
        currentCanvas.printCanvas();
    }
    catch (err) {
        handleError(err.message);
    }
};
const createRectangle = (upperLeft, lowerRight) => {
    try {
        if (!currentCanvas)
            throw new Error('Canvas is not yet existing!');
        currentCanvas.createRectangle(upperLeft, lowerRight);
        currentCanvas.printCanvas();
    }
    catch (err) {
        handleError(err.message);
    }
};
const fill = (x, y, character) => {
    try {
        if (!currentCanvas)
            throw new Error('Canvas is not yet existing!');
        currentCanvas.fill(x, y, character);
        currentCanvas.printCanvas();
    }
    catch (err) {
        console.log(err);
        handleError(err.message);
    }
};
const isInputValid = (params, numberOfParams) => {
    for (let i = 0; i < numberOfParams; i++) {
        if (isNaN(parseInt(params[i]))) {
            handleError('Invalid user input!');
            return false;
        }
        else if (parseInt(params[i]) < 0) {
            handleError('Coordinates is invalid!');
            return false;
        }
    }
    return true;
};
const getUserInput = () => {
    const questionHandler = (userInput) => {
        const params = userInput.split(' ');
        const command = params[0].toLowerCase();
        switch (command) {
            case 'q':
                console.log(safe_1.default.green('Closing program!'));
                rl.close();
                break;
            case 'c':
                if (isInputValid(params.slice(1), 2)) {
                    createCanvas({
                        x: parseInt(params[1]),
                        y: parseInt(params[2]),
                    });
                }
                getUserInput();
                break;
            case 'r':
            case 'l':
                if (isInputValid(params.slice(1), 4)) {
                    const coordinate1 = {
                        x: parseInt(params[1]) - 1,
                        y: parseInt(params[2]),
                    };
                    const coordinate2 = {
                        x: parseInt(params[3]) - 1,
                        y: parseInt(params[4]),
                    };
                    if (command === 'l') {
                        createLine(coordinate1, coordinate2);
                    }
                    else {
                        createRectangle(coordinate1, coordinate2);
                    }
                }
                getUserInput();
                break;
            case 'b':
                if (isInputValid(params.slice(1), 2)) {
                    fill(parseInt(params[1]), parseInt(params[2]), params[3]);
                }
                getUserInput();
                break;
            case 'r':
            default:
                console.log(safe_1.default.red('Invalid command! \n'));
                rl.question('enter command: ', questionHandler);
        }
    };
    rl.question('enter command: ', questionHandler);
};
getUserInput();
