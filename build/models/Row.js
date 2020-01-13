"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rows {
    constructor(length, content = ' ') {
        this.content = [];
        this.fillArray(content, length);
    }
    isValidCoordinate(xAxis) {
        return xAxis < this.content.length;
    }
    insertAtCoordinate(xAxis, character) {
        this.content.splice(xAxis, 1, character);
    }
    updateContent(xAxis, character) {
        if (!this.isValidCoordinate(xAxis))
            return false;
        this.insertAtCoordinate(xAxis, character);
        return true;
    }
    printContent() {
        return this.content.join(' ');
    }
    fillArray(value, length) {
        if (length === 0)
            return;
        for (let i = 0; i < length; i++) {
            this.content.push(value);
        }
    }
}
exports.default = Rows;
