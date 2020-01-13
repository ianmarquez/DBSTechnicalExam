import readline from 'readline';
import Canvas, { Coordinate } from './models/Canvas';
import colors from 'colors/safe';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let currentCanvas: Canvas;

const handleError = (message: string) : void => {
    console.log(colors.red(`${message} \n`));
}

const createCanvas = (coordinate: Coordinate) : void => {
    try {
        currentCanvas = new Canvas (coordinate);
        currentCanvas.printCanvas();
    } catch (err) {
        handleError(err.message);
    }
}

const createLine = (start: Coordinate, destination: Coordinate) : void => {
    try {
        if (!currentCanvas) throw new Error('Canvas is not yet existing!');
        currentCanvas.createLine(start, destination);
        currentCanvas.printCanvas();
    } catch (err) {
        handleError(err.message);
    }
}

const createRectangle = (upperLeft: Coordinate, lowerRight: Coordinate) : void => {
    try {
        if (!currentCanvas) throw new Error('Canvas is not yet existing!');
        currentCanvas.createRectangle(upperLeft, lowerRight);
        currentCanvas.printCanvas();
    } catch (err) {
        handleError(err.message);
    }
}

const fill = (x: number, y: number, character: string) {
    
}

const isInputValid = (params: Array<string>, numberOfParams: number) : boolean => {
    for (let i = 0; i < numberOfParams; i++) {
        if (isNaN(parseInt(params[i]))) {
            handleError('Invalid user input!');
            return false;
        } else if (parseInt(params[i]) < 0 ) {
            handleError('Coordinates is invalid!')
            return false;
        }
    }
    return true;
}

const getUserInput = () : void => {
    const questionHandler = ( userInput : string) => {
        const params = userInput.split(' ');
        const command = params[0].toLowerCase();
        switch(command) {
            case 'q':
                console.log(colors.green('Closing program!'));
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
                    if(command === 'l') {
                        createLine(coordinate1, coordinate2);
                    } else {
                        createRectangle(coordinate1, coordinate2);
                    }
                }
                getUserInput();
                break;
            default:
                console.log(colors.red('Invalid command! \n'));
                rl.question('enter command: ', questionHandler);
        }
    }
    rl.question('enter command: ', questionHandler);
}
  
getUserInput();