import {BLUE, CYAN, GREEN, ORANGE, PURPLE, RED, YELLOW} from "./Playfield.js";
import {CellBox3} from "./CellBox3.js";

export class FallingPiece {
    constructor(cellBox) {
        this._cellBox = cellBox;
    }

    attemptRight(playfield) {
        return this.changeCellBoxIfValid(playfield, c => c.translate(1, 0));
    }

    attemptLeft(playfield) {
        return this.changeCellBoxIfValid(playfield, c => c.translate(-1, 0));
    }

    attemptRotate(playfield) {
        return this.changeCellBoxIfValid(playfield, c => c.rotate());
    }

    down() {
        this._cellBox = this._cellBox.translate(0, 1);
    }

    moveDownShouldAbsorb(playfield) {
        return !this.isCellBoxChangeValid(playfield, this._cellBox.translate(0, 1));
    }

    changeCellBoxIfValid(playfield, callback) {
        let newCellBox = callback(this._cellBox);

        if (this.isCellBoxChangeValid(playfield, newCellBox)) {
            this._cellBox = newCellBox;
            return true;
        }

        return false;
    }

    isCellBoxChangeValid(playfield, newCellBox) {
        return playfield.allCellsEmpty(newCellBox.getCells());
    }

    getCells() {
        return this._cellBox.getCells();
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

