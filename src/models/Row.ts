import Item from "./Item";
import _ from 'underscore';

export default class Row {
    public readonly items : Array<Item> = [];
    private _index: number;

    public constructor(length: number, index: number, content: string = ' ') {
        this.fillArray(content, length);
        this._index = index;
    }

    get index() {
        return this._index;
    }

    private isValidCoordinate(xAxis: number) : boolean {
        return xAxis < this.items.length;
    }

    private insertAtCoordinate(xAxis: number, character: string) : void {
        this.items[xAxis].content = character;
        this.items.splice(xAxis, 1, this.items[xAxis]);
    }

    public updateContent(xAxis: number, character) : boolean {
        if(!this.isValidCoordinate(xAxis)) return false;
        this.insertAtCoordinate(xAxis, character);
        return true;
    }

    public printContent() : string {
        let itemContents: string[] = [];
        for(const item of this.items) {
            itemContents.push(item.content);
        }
        return itemContents.join(' ');
    }

    private fillArray(value: string, length: number): void {
        if (length === 0) return;
        for (let i = 0; i < length; i++) {
            this.items.push(new Item(i, value));
        }
    }
}