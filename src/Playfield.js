import {Cell} from './Cell.js';

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

function range(start, count) {
    return Array.apply(0, new Array(count))
        .map(function (element, index) {
            return index + start;
        });
}

export class Playfield {
    constructor(width = 10, height = 22) {
        this.width = width;
        this.height = height;
        this.board = buildArray(this.width, this.height);
    }

    allCellsEmpty(cells) {
        return cells.every(cell => this.isValidEmptyCell(cell));
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

        for (let y = 0; y < this.height + 1; y++) {
            // left wall
            spaces.push(new Cell(0, y, BORDER));

            // right wall
            spaces.push(new Cell(this.width + 1, y, BORDER));
        }

        for (let x = 0; x < this.width + 2; x++) {
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

    setStateAtCell(cell, state) {
        this.board[cell.y - 1][cell.x - 1] = state;
    }

    setStateAt(x, y, state) {
        this.board[y - 1][x - 1] = state;
    }

    * everyCell() {
        for (let x = 1; x <= this.width; x++) {
            for (let y = 1; y <= this.height; y++) {
                yield this.cellAt(x, y);
            }
        }
    }

    absorbFallingPiece(fallingPiece) {
        for (let cell of fallingPiece.getCells()) {
            this.setStateAtCell(cell, cell.state);
        }

        this.checkForRowClears();
    }

    checkForRowClears() {
        for (let y = this.height; y >= 1; y--) {
            if (this.rowIsFull(y)) {
                this.clearRow(y);

                // all rows have moved down now, need to recheck this row
                y++;
            }
        }
    }

    rowIsFull(y) {
        return range(1, this.width).map(x => this.cellAt(x, y)).every(cell => cell.state !== EMPTY);
    }

    clearRow(y) {
        range(1, this.width).forEach(x => this.setStateAt(x, y, EMPTY));

        this.gravityRow(y);
    }

    gravityRow(y) {
        console.log("gravityRow(" + y + ")");
        range(1, this.width).forEach(x => this.setStateAt(x, y, this.cellAt(x, y - 1).state))

        if (y > 2) {
            this.gravityRow(y - 1);
        } else {
            range(1, this.width).forEach(x => this.setStateAt(x, 1, EMPTY));
        }
    }
}
