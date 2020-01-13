"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("./Item"));
class Row {
    constructor(length, index, content = ' ') {
        this.items = [];
        this.fillArray(content, length);
        this._index = index;
    }
    get index() {
        return this._index;
    }
    isValidCoordinate(xAxis) {
        return xAxis < this.items.length;
    }
    insertAtCoordinate(xAxis, character) {
        this.items[xAxis].content = character;
        this.items.splice(xAxis, 1, this.items[xAxis]);
    }
    updateContent(xAxis, character) {
        if (!this.isValidCoordinate(xAxis))
            return false;
        this.insertAtCoordinate(xAxis, character);
        return true;
    }
    printContent() {
        let itemContents = [];
        for (const item of this.items) {
            itemContents.push(item.content);
        }
        return itemContents.join(' ');
    }
    fillArray(value, length) {
        if (length === 0)
            return;
        for (let i = 0; i < length; i++) {
            this.items.push(new Item_1.default(i, value));
        }
    }
}
exports.default = Row;
