"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Row_1 = __importDefault(require("./Row"));
const underscore_1 = __importDefault(require("underscore"));
const safe_1 = __importDefault(require("colors/safe"));
class Canvas {
    constructor(coordinates) {
        this.rowLabel = new Row_1.default(coordinates.x, -1, '-');
        this.rows = {};
        for (let i = 0; i <= coordinates.y; i++) {
            this.rows[i.toString()] = new Row_1.default(coordinates.x, i);
        }
    }
    printCanvas() {
        console.log(safe_1.default.yellow(`| ${this.rowLabel.printContent()} | \n`));
        for (const key in this.rows) {
            if (key !== '0') {
                console.log(safe_1.default.green(`| ${this.rows[key].printContent()} | \n`));
            }
        }
        console.log(safe_1.default.yellow(`| ${this.rowLabel.printContent()} | \n`));
    }
    createLine(start, destination, symbol = 'x') {
        if (destination.x > this.rows[0].items.length)
            throw new Error('Invalid Coordinates!');
        if (start.x === destination.x && destination.y > start.y) {
            underscore_1.default.each(this.rows, (row, index) => {
                if (start.y <= index && index <= destination.y) {
                    this.rows[index].updateContent(start.x, symbol);
                }
            });
        }
        else if (start.y === destination.y && destination.x > start.x) {
            let row = this.rows[start.y];
            for (let i = 0; i <= row.items.length; i++) {
                if (start.x <= i && i <= destination.x) {
                    row.updateContent(i, symbol);
                }
            }
        }
        else {
            throw new Error('This only supports lines that are vertical and horizontal.');
        }
    }
    createRectangle(upperLeft, lowerRight) {
        this.createLine({
            x: upperLeft.x,
            y: upperLeft.y,
        }, {
            x: lowerRight.x,
            y: upperLeft.y,
        });
        this.createLine({
            x: upperLeft.x,
            y: lowerRight.y,
        }, {
            x: lowerRight.x,
            y: lowerRight.y,
        });
        this.createLine({
            x: upperLeft.x,
            y: upperLeft.y,
        }, {
            x: upperLeft.x,
            y: lowerRight.y,
        });
        this.createLine({
            x: lowerRight.x,
            y: upperLeft.y,
        }, {
            x: lowerRight.x,
            y: lowerRight.y,
        });
    }
    fill(x, y, color) {
        let rowsToBeProcessed = [y];
        while (rowsToBeProcessed.length !== 0) {
            const currentRow = rowsToBeProcessed[0];
            if (this.rows[currentRow]) {
                let itemsToBeProcessed = [this.rows[currentRow].items[x]];
                while (itemsToBeProcessed.length !== 0) {
                    const item = itemsToBeProcessed[0];
                    if (item && item.content !== 'x' && item.content === ' ') {
                        item.content = color;
                        const currentItemIndex = item.index;
                        if (currentItemIndex - 1 >= 0 &&
                            this.rows[currentRow].items[currentItemIndex - 1].content !== 'x' &&
                            this.rows[currentRow].items[currentItemIndex - 1].content === ' ') {
                            itemsToBeProcessed.push(this.rows[currentRow].items[currentItemIndex - 1]);
                        }
                        if (currentItemIndex + 1 < this.rows[currentRow].items.length &&
                            this.rows[currentRow].items[currentItemIndex + 1].content !== 'x') {
                            itemsToBeProcessed.push(this.rows[currentRow].items[currentItemIndex + 1]);
                        }
                        rowsToBeProcessed.push(currentRow - 1);
                        rowsToBeProcessed.push(currentRow + 1);
                    }
                    else {
                        itemsToBeProcessed.push(this.rows[currentRow].items[item.index]);
                    }
                    itemsToBeProcessed.shift();
                }
            }
            rowsToBeProcessed.shift();
        }
    }
}
exports.default = Canvas;
