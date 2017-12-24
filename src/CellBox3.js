import {Cell} from "./Cell.js";

export class CellBox3 {
    constructor(cellMap, state, offsetX = 0, offsetY = 0) {
        if (cellMap.length !== 9) {
            throw 'CellBox3 map must be 9 cells.'
        }

        this._cellMap = cellMap;
        this._state = state;
        this._offsetX = offsetX;
        this._offsetY = offsetY;
    }

    getCells() {
        let cells = [];

        for (let x = 1; x <= 3; x++) {
            for (let y = 1; y <= 3; y++) {
                if (this._cellMap[((y - 1) * 3) + (x - 1)] === 1) {
                    cells.push(new Cell(x + this._offsetX, y + this._offsetY, this._state));
                }
            }
        }

        return cells;
    }

    /**
     * There is probably some math to do this, but the transformation
     * is just:
     *
     *   0 1 2       6 3 0
     *   3 4 5  ==>  7 4 1
     *   6 7 8       8 5 2
     */
    rotate() {
        let c = this._cellMap;

        return new CellBox3(
            [
                c[6], c[3], c[0],
                c[7], c[4], c[1],
                c[8], c[5], c[2],
            ],
            this._state,
            this._offsetX,
            this._offsetY
        );
    }

    translate(x, y) {
        return new CellBox3(
            this._cellMap,
            this._state,
            this._offsetX + x,
            this._offsetY + y
        );
    }
}

