import Row from "./Row";
import _ from 'underscore';
import colors from 'colors/safe';
import Item from "./Item";

export interface Coordinate {
    x: number;
    y: number;
}

export default class Canvas {
    private rows : {
        [key: string]: Row
    };
    private rowLabel: Row;

    public constructor(coordinates: Coordinate) {
        this.rowLabel = new Row(coordinates.x, -1, '-');
        this.rows = {};
        for(let i:number = 0; i <= coordinates.y; i++) {
            this.rows[i.toString()] = new Row(coordinates.x, i);
        }
    }

    public printCanvas() : void {
        console.log(colors.yellow(`| ${this.rowLabel.printContent()} | \n`));
        for (const key in this.rows) {
            if( key !== '0') {
                console.log(colors.green(`| ${this.rows[key].printContent()} | \n`));
            }
        }
        console.log(colors.yellow(`| ${this.rowLabel.printContent()} | \n`));
    }

    public createLine(start: Coordinate, destination: Coordinate, symbol: string = 'x') : void {
        if(destination.x > this.rows[0].items.length) throw new Error('Invalid Coordinates!');
        if(start.x === destination.x && destination.y > start.y) {
            _.each(this.rows, (row: Row, index: number) => {
                if ( start.y <= index && index <= destination.y) {
                    this.rows[index].updateContent(start.x, symbol)
                }
            });
        } else if (start.y === destination.y && destination.x > start.x) {
            let row : Row = this.rows[start.y];
            for (let i = 0; i <= row.items.length; i++) {
                if ( start.x <= i && i <= destination.x) {
                    row.updateContent(i, symbol)
                }
            }
        } else {
            throw new Error('This only supports lines that are vertical and horizontal.')
        }
    }

    public createRectangle(upperLeft:Coordinate, lowerRight:Coordinate) : void {
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

    public fill(x: number, y: number, color: string) : void {
        const SYM_IN_TARGET = this.rows[y].items[x].content;
        const isItemOutofBounds = (index: number) : boolean => {
            return !(0 <= index && index <= this.rows[0].items.length);
        }

        const isRowOutofBounds = (index: number) : boolean => {
            return !(0 < index && index <= Object.keys(this.rows).length);
        }

        const changeColors = (rowIndex: number, item: Item): void => {
            if (item.content === SYM_IN_TARGET) {
                item.content = color;
            }

            const topRowIndex = rowIndex - 1;
            const bottomRowIndex = rowIndex + 1
            const top = !isRowOutofBounds(topRowIndex) && this.rows[topRowIndex] ? this.rows[topRowIndex].items[item.index] : null;
            const bottom = !isRowOutofBounds(bottomRowIndex) && this.rows[bottomRowIndex] ? this.rows[bottomRowIndex].items[item.index] : null;
            const left = !isItemOutofBounds(item.index - 1) && this.rows[rowIndex] ? this.rows[rowIndex].items[item.index - 1] : null;
            const right = !isItemOutofBounds(item.index + 1) && this.rows[rowIndex] ? this.rows[rowIndex].items[item.index + 1] : null;

            if(top && top.content === SYM_IN_TARGET) {
                changeColors(topRowIndex, top);
            }

            if (bottom && bottom.content === SYM_IN_TARGET) {
                changeColors(bottomRowIndex, bottom);
            }

            if (left && left.content === SYM_IN_TARGET) {
                changeColors(rowIndex, left);
            }

            if (right && right.content === SYM_IN_TARGET) {
                changeColors(rowIndex, right);
            }
        };

        const seedItem = this.rows[y].items[x];
        if(color !== SYM_IN_TARGET) {
            changeColors(y, seedItem)
        }
    }

}