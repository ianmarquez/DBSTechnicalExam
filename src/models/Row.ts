export default class Rows {
    public readonly content : Array<string> = [];

    public constructor(length: number, content: string = ' ') {
        this.fillArray(content, length);
    }

    private isValidCoordinate(xAxis: number) : boolean {
        return xAxis < this.content.length;
    }

    private insertAtCoordinate(xAxis: number, character: string) : void {
        this.content.splice(xAxis, 1, character);
    }

    public updateContent(xAxis: number, character) : boolean {
        if(!this.isValidCoordinate(xAxis)) return false;
        this.insertAtCoordinate(xAxis, character);
        return true;
    }

    public printContent() : string {
        return this.content.join(' ');
    }

    private fillArray(value: string, length: number): void {
        if (length === 0) return;
        for (let i = 0; i < length; i++) {
            this.content.push(value);
        }
    }
}