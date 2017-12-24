export class Cell {
    constructor(x, y, state) {
        this.x = x;
        this.y = y;
        this.state = state;
    }

    left() {
        return new Cell(this.x - 1, this.y, this.state);
    }

    right() {
        return new Cell(this.x + 1, this.y, this.state);
    }

    up() {
        return new Cell(this.x, this.y - 1, this.state);
    }

    down() {
        return new Cell(this.x, this.y + 1, this.state);
    }

    toString() {
        return "Cell(x=" + this.x + ", y=" + this.y + ", state=" + this.state + ")";
    }
}
