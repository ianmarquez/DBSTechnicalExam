import Row from "./Row";
import _ from 'underscore';
import colors from 'colors/safe';

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
        this.rowLabel = new Row(coordinates.x, '-');
        this.rows = {};
        for(let i:number = 0; i <= coordinates.y; i++) {
            this.rows[i.toString()] = new Row(coordinates.x);
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
        if(destination.x > this.rows[0].content.length) throw new Error('Invalid Coordinates!');
        if(start.x === destination.x && destination.y > start.y) {
            _.each(this.rows, (row: Row, index: number) => {
                if ( start.y <= index && index <= destination.y) {
                    this.rows[index].updateContent(start.x, symbol)
                }
            });
        } else if (start.y === destination.y && destination.x > start.x) {
            let row : Row = this.rows[start.y];
            for (let i = 0; i <= row.content.length; i++) {
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
        
    }

}