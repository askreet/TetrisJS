export class FallingPiece {
    constructor(tetrominoType, cellBox) {
        this._tetrominoType = tetrominoType;
        this._cellBox = cellBox;
    }

    get tetrominoType() { return this._tetrominoType; }

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
}

