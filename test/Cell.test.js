import {EMPTY} from "../src/Playfield.js";
import {Cell} from "../src/Cell.js";

describe('Cell', function() {
    "use strict";

    it('should translate offsets', function() {
        let cell = new Cell(1, 1, EMPTY);

        let newCell = cell.translate(1, 2);

        expect(newCell.x).to.equal(2);
        expect(newCell.y).to.equal(3);
    });
});