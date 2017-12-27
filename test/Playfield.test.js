import {Playfield} from "../src/Playfield.js";
import {Cell} from "../src/Cell.js";

function cellsForGrid(width, height, states) {
    let cells = [];

    for (let y = 1; y <= height; y++) {
        for (let x = 1; x <= width; x++) {
            let state = states[(((y - 1) * width) + x) - 1];
            let cell = new Cell(x, y, state);

            cells.push(cell);
        }
    }

    return cells;
}

function fallingPieceForGrid(width, height, states) {
    "use strict";

    return {
        getCells: function () {
            return cellsForGrid(width, height, states).filter(cell => cell.state !== 0);
        }
    }
}

function newPlayfieldWithState(width, height, states) {
    "use strict";

    let playfield = new Playfield(width, height);

    for (let cell of cellsForGrid(width, height, states)) {
        playfield.setStateAtCell(cell, cell.state)
    }

    return playfield;
}

function playfieldToGrid(playfield) {
    "use strict";

    // TODO: broken encapsulation
    return Array.from(playfield._grid._storage);
}

describe('Playfield', () => {
    "use strict";

    describe('basic properties', () => {
        it('should work', () => {
            let playfield = newPlayfieldWithState(1, 1, [1]);

            expect(playfield.width).to.equal(1);
            expect(playfield.height).to.equal(1);
        });
    });

    describe('setStateAt', () => {
        it('should update the cell state', () => {
            let playfield = newPlayfieldWithState(3, 3,
                [
                    0, 0, 0,
                    1, 1, 1,
                    0, 0, 0,
                ]);

            expect(playfield.cellAt(2, 2).state).to.equal(1);
            playfield.setStateAt(2, 2, 2);
            expect(playfield.cellAt(2, 2).state).to.equal(2);
        });
    });

    describe('absorbFallingPiece', () => {
        it('should add cells from falling piece to state', () => {
            let playfield = newPlayfieldWithState(3, 3, [
                0, 0, 0,
                0, 0, 0,
                1, 0, 1,
            ]);

            let fallingPiece = fallingPieceForGrid(3, 3, [
                1, 1, 0,
                0, 1, 1,
                0, 0, 0,
            ]);

            playfield.absorbFallingPiece(fallingPiece);

            expect(playfieldToGrid(playfield)).to.deep.equal([
                1, 1, 0,
                0, 1, 1,
                1, 0, 1,
            ]);
        });

        it('should clear rows immediately after absorbing a falling piece', () => {
            let playfield = newPlayfieldWithState(3, 3, [
                0, 0, 0,
                0, 0, 0,
                1, 0, 1,
            ]);

            let fallingPiece = fallingPieceForGrid(3, 3, [
                0, 0, 1,
                0, 1, 1,
                0, 1, 0,
            ]);

            playfield.absorbFallingPiece(fallingPiece);

            expect(playfieldToGrid(playfield)).to.deep.equal([
                0, 0, 0,
                0, 0, 1,
                0, 1, 1,
            ]);
        });

        it('should handle multiple row clears', () => {
            let playfield = newPlayfieldWithState(5, 5, [
                0, 0, 1, 1, 1,
                0, 1, 1, 1, 1,
                0, 1, 1, 1, 1,
                0, 1, 1, 0, 1,
                0, 1, 1, 1, 1,
            ]);

            let fallingPiece = fallingPieceForGrid(5, 5, [
                0, 0, 0, 0, 0,
                1, 0, 0, 0, 0,
                1, 0, 0, 0, 0,
                1, 0, 0, 0, 0,
                1, 0, 0, 0, 0,
            ]);

            playfield.absorbFallingPiece(fallingPiece);

            expect(playfieldToGrid(playfield)).to.deep.equal([
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 1, 1, 1,
                0, 1, 1, 0, 1,
            ])
        })
    });
});