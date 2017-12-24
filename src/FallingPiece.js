import {BLUE, CYAN, GREEN, ORANGE, PURPLE, RED, YELLOW} from "./Playfield.js";
import {CellBox3} from "./CellBox3.js";

export class FallingPiece {
    constructor(cellBox) {
        this._cellBox = cellBox;
        this._offsetX = 0;
        this._offsetY = 0;
    }

    attemptRight(board) {
        let proposedNewCells = this.getCells().map(loc => loc.right());

        if (proposedNewCells.every(loc => board.isValidEmptyCell(loc))) {
            this._offsetX += 1;
            return true;
        }

        return false;
    }

    attemptLeft(board) {
        let proposedNewCells = this.getCells().map(loc => loc.left());

        if (proposedNewCells.every(loc => board.isValidEmptyCell(loc))) {
            this._offsetX -= 1;
            return true;
        }

        return false;
    }

    down() {
        this._offsetY += 1;
    }

    moveDownShouldAbsorb(board) {
        let proposedNewCell = this.getCells().map(loc => loc.down());

        return !proposedNewCell.every(loc => board.isValidEmptyCell(loc));
    }

    getCells() {
        return this._cellBox.getCells().map(
            cell => cell.translate(this._offsetX, this._offsetY)
        );
    }

    static newIBlock() {
        // return this.newGhost(1, 2, 2, 2, 3, 2, 4, 2, CYAN);
    }

    static newOBlock() {
        // return this.newGhost(2, 1, 3, 1, 2, 2, 3, 2, YELLOW);
    }

    static newTBlock() {
        return new FallingPiece(
            new CellBox3(
                [
                    0, 1, 0,
                    1, 1, 1,
                    0, 0, 0,
                ],
                PURPLE
            )
        );
    }

    static newSBlock() {
        return new FallingPiece(
            new CellBox3(
                [
                    0, 1, 1,
                    1, 1, 0,
                    0, 0, 0,
                ],
                GREEN
            )
        );
    }

    static newZBlock() {
        return new FallingPiece(
            new CellBox3(
                [
                    1, 1, 0,
                    0, 1, 1,
                    0, 0, 0,
                ],
                RED
            )
        );
    }

    static newJBlock() {
        return new FallingPiece(
            new CellBox3(
                [
                    1, 0, 0,
                    1, 1, 1,
                    0, 0, 0,
                ],
                BLUE
            )
        );
    }

    static newLBlock() {
        return new FallingPiece(
            new CellBox3(
                [
                    0, 0, 1,
                    1, 1, 1,
                    0, 0, 0,
                ],
                ORANGE
            )
        );
    }
}

