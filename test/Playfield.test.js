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
        getCells: function() {
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
    let grid = [];

    for (let row of playfield.board) {
        for (let col of row) {
            grid.push(col);
        }
    }

    return grid;
}

describe('Playfield', function() {
    "use strict";

    describe('absorbFallingPiece', function() {
        it('should add cells from falling piece to state', function() {
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

        it('should clear rows immediately after absorbing a falling piece', function() {
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

        it('should handle multiple row clears', function() {
            let playfield = newPlayfieldWithState(5, 5, [
                0, 0, 1, 1, 1,
                0, 1, 1, 1, 1,
                0, 1, 1, 1, 1,
                0, 1, 1, 0, 1,
                0, 1, 1, 1, 1,
            ]);

            let fallingPiece = fallingPieceForGrid(5,5 ,[
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