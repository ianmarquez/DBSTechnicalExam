"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(index, content) {
        this._content = content;
        this._index = index;
    }
    set content(content) {
        this._content = content;
    }
    get content() {
        return this._content;
    }
    get index() {
        return this._index;
    }
}
exports.default = Item;
