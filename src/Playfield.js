import {Cell} from './Cell.js';
import {Grid} from "./Grid.js";

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
        this._grid = new Grid(width, height);
    }

    get width() { return this._grid.width }
    get height() { return this._grid.height }

    allCellsEmpty(cells) {
        return cells.every(cell => this.isValidEmptyCell(cell));
    }

    isValidEmptyCell(cell) {
        if (cell.x < 1 || cell.y < 1) {
            return false;
        }

        if (cell.x > this.width || cell.y > this.height) {
            return false;
        }

        return !this.anythingAt(cell.x, cell.y);
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

        this._grid.forEach((x, y, state) => {
            if (state !== EMPTY) {
                spaces.push(new Cell(x, y, state));
            }
        });

        return spaces;
    }

    anythingAt(x, y) {
        return this._grid.at(x, y) !== EMPTY;
    }

    cellAt(x, y) {
        return new Cell(x, y, this._grid.at(x, y));
    }

    setStateAtCell(cell, state) {
        this._grid.set(cell.x, cell.y, state);
    }

    setStateAt(x, y, state) {
        this._grid.set(x, y, state);
    }

    absorbFallingPiece(fallingPiece) {
        for (let cell of fallingPiece.getCells()) {
            this.setStateAtCell(cell, cell.state);
        }

        return this._checkForRowClears();
    }

    _checkForRowClears() {
        let numberOfClearedRows = 0;

        for (let y = this.height; y >= 1; y--) {
            if (this._rowIsFull(y)) {
                this._clearRow(y);

                // all rows have moved down now, need to recheck this row
                y++;
                numberOfClearedRows++;
            }
        }

        return numberOfClearedRows;
    }

    _rowIsFull(y) {
        return range(1, this.width).map(x => this.cellAt(x, y)).every(cell => cell.state !== EMPTY);
    }

    _clearRow(y) {
        range(1, this.width).forEach(x => this.setStateAt(x, y, EMPTY));

        this._gravityRow(y);
    }

    _gravityRow(y) {
        range(1, this.width).forEach(x => this.setStateAt(x, y, this.cellAt(x, y - 1).state))

        if (y > 2) {
            this._gravityRow(y - 1);
        } else {
            range(1, this.width).forEach(x => this.setStateAt(x, 1, EMPTY));
        }
    }
}
