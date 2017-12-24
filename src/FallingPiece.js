import {BLUE, CYAN, GREEN, ORANGE, PURPLE, RED, YELLOW} from "./Playfield.js";
import { Cell } from "./Cell.js";

export class FallingPiece {
    constructor(cells) {
        this._cells = cells;
    }

    attemptRight(board) {
        let proposedNewCells = this._cells.map(loc => loc.right());

        if (proposedNewCells.every(loc => board.isValidEmptyCell(loc))) {
            this._cells = proposedNewCells;
            return true;
        }

        return false;
    }

    attemptLeft(board) {
        let proposedNewCells = this._cells.map(loc => loc.left());

        if (proposedNewCells.every(loc => board.isValidEmptyCell(loc))) {
            this._cells = proposedNewCells;
            return true;
        }

        return false;
    }

    down() {
        this._cells = this._cells.map(loc => loc.down());
    }

    moveDownShouldAbsorb(board) {
        let proposedNewCell = this._cells.map(loc => loc.down());

        return !proposedNewCell.every(loc => board.isValidEmptyCell(loc));
    }

    getCells() {
        return this._cells;
    }

    static newIBlock() {
        return this.newGhost(1, 2, 2, 2, 3, 2, 4, 2, CYAN);
    }

    static newOBlock() {
        return this.newGhost(2, 1, 3, 1, 2, 2, 3, 2, YELLOW);
    }

    static newTBlock() {
        return this.newGhost(1, 2, 2, 2, 3, 2, 2, 1, PURPLE);
    }

    static newSBlock() {
        return this.newGhost(1, 2, 2, 2, 2, 1, 3, 1, GREEN);
    }

    static newZBlock() {
        return this.newGhost(1, 1, 2, 1, 2, 2, 3, 2, RED);
    }

    static newJBlock() {
        return this.newGhost(1, 1, 1, 2, 2, 2, 3, 2, BLUE);
    }

    static newLBlock() {
        return this.newGhost(1, 2, 2, 2, 3, 2, 3, 1, ORANGE);
    }

    static newGhost(x1, y1, x2, y2, x3, y3, x4, y4, state) {
        return new FallingPiece([
            new Cell(x1, y1, state),
            new Cell(x2, y2, state),
            new Cell(x3, y3, state),
            new Cell(x4, y4, state),
        ]);
    }
}

