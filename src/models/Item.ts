export default class Item {
    public _content: string; 
    public _index: number;

    public constructor(index: number, content: string) {
        this._content = content;
        this._index = index;
    }

    set content(content: string) {
        this._content = content;
    }

    get content() {
        return this._content;
    }

    get index() {
        return this._index;
    }
}