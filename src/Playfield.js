import { Cell } from './Cell.js';

function buildArray(x, y) {
    let theArray = new Array(y);

    for (let i = 0; i < y; i++) {
        theArray[i] = new Uint8Array(x);
    }

    return theArray;
}

export const EMPTY = 0;
export const CYAN = 1;
export const YELLOW = 2;
export const PURPLE = 3;
export const GREEN = 4;
export const RED = 5;
export const BLUE = 6;
export const ORANGE = 7;
export const BORDER = 8;

export class Playfield {
    constructor() {
        this.width = 10;
        this.height = 22;
        this.board = buildArray(this.width, this.height);
    }

    isValidEmptyCell(location) {
        if (location.x < 1 || location.y < 1) {
            return false;
        }

        if (location.x > this.width || location.y > this.height) {
            return false;
        }

        return !this.anythingAt(location.x, location.y);
    }

    occupiedCells() {
        let spaces = [];

        for (let y=0; y < this.height + 1; y++) {
            // left wall
            spaces.push(new Cell(0, y, BORDER));

            // right wall
            spaces.push(new Cell(this.width + 1, y, BORDER));
        }

        for (let x=0; x < this.width + 2; x++) {
            // floor
            spaces.push(new Cell(x, this.height + 1, BORDER));
        }

        for (let cell of this.everyCell()) {
            if (this.anythingAt(cell.x, cell.y)) {
                spaces.push(cell);
            }
        }

        return spaces;
    }

    anythingAt(x, y) {
        return this.cellAt(x, y).state !== EMPTY;
    }

    cellAt(x, y) {
        return new Cell(x, y, this.board[y - 1][x - 1]);
    }

    setStateAtCell(location, state) {
        console.log("Setting state " + state + " at " + location);
        this.board[location.y - 1][location.x - 1] = state;
    }

    * everyCell() {
        for (let x = 1; x <= this.width; x++) {
            for (let y = 1; y <= this.height; y++) {
                yield new Cell(x, y, this.board[y - 1][x - 1]);
            }
        }
    }

    absorbFallingPiece(fallingPiece) {
        for (let location of fallingPiece.cells) {
            this.setStateAtCell(location, location.state);
        }
    }
}
