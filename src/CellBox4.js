import {Cell} from "./Cell.js";

export class CellBox4 {
    constructor(cellMap, state, offsetX = 0, offsetY = 0) {
        if (cellMap.length !== 16) {
            throw 'CellBox4 map must be 16 cells.'
        }

        this._cellMap = cellMap;
        this._state = state;
        this._offsetX = offsetX;
        this._offsetY = offsetY;
    }

    getCells() {
        let cells = [];

        for (let x = 1; x <= 4; x++) {
            for (let y = 1; y <= 4; y++) {
                if (this._cellMap[((y - 1) * 4) + (x - 1)] === 1) {
                    cells.push(new Cell(x + this._offsetX, y + this._offsetY, this._state));
                }
            }
        }

        return cells;
    }

    /**
     *  0  1  2  3       12  8  4  0
     *  4  5  6  7  ==>  13  9  5  1
     *  8  9 10 11  ==>  14 10  6  2
     * 12 13 14 15       15 11  7  3
     */
    rotate() {
        let c = this._cellMap;

        return new CellBox4(
            [
                c[12], c[8], c[4], c[0],
                c[13], c[9], c[5], c[1],
                c[14], c[10], c[6], c[2],
                c[15], c[11], c[7], c[3],
            ],
            this._state,
            this._offsetX,
            this._offsetY
        );
    }

    translate(x, y) {
        return new CellBox4(
            this._cellMap,
            this._state,
            this._offsetX + x,
            this._offsetY + y
        );
    }
}
