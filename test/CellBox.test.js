import {CellBox3} from '../src/CellBox3.js';
import {CYAN} from '../src/Playfield.js';

function newSCellBox3() {
    "use strict";

    return new CellBox3([
        0, 1, 1,
        1, 1, 0,
        0, 0, 0,
    ], CYAN);
}

function getCoords(cellBox) {
    return cellBox.getCells().map(cell => [cell.x, cell.y]);
}

describe('3x3 CellBox', function () {
    "use strict";
    it('should return cells', function () {
        let cellbox1 = newSCellBox3();

        expect(cellbox1.getCells().length).to.equal(4);

        expect(getCoords(cellbox1)).to.have.deep.members([
            [2, 1],
            [3, 1],
            [1, 2],
            [2, 2],
        ]);
    });

    it('should rotate clockwise', function() {
        let cellbox1 = newSCellBox3();

        let rotatedCellbox = cellbox1.rotate();

        expect(getCoords(rotatedCellbox)).to.have.deep.members([
            [2, 1],
            [2, 2],
            [3, 2],
            [3, 3],
        ]);
    });

    it('should translate', function() {
        let cellbox1 = newSCellBox3();

        console.log(cellbox1.getCells());

        let translatedCellbox = cellbox1.translate(1, 0);

        console.log(translatedCellbox.getCells());

        expect(getCoords(translatedCellbox)).to.have.deep.members([
            [2, 2],
            [3, 1],
            [3, 2],
            [4, 1],
        ]);
    });
});

