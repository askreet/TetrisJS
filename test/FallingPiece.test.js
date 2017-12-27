import {Playfield} from "../src/Playfield.js";
import {FallingPiece} from "../src/FallingPiece.js";

function getCoords(fallingPiece) {
    "use strict";

    return fallingPiece.getCells().map(cell => [cell.x, cell.y]);
}

describe('FallingPiece', function() {
    "use strict";

    it('should move right when not blocked', function() {
        let playfield = new Playfield();
        let fallingPiece = FallingPiece.newSBlock();

        expect(getCoords(fallingPiece)).to.have.deep.members([
            [2, 1],
            [3, 1],
            [1, 2],
            [2, 2],
        ]);

        fallingPiece.attemptRight(playfield);

        expect(getCoords(fallingPiece)).to.have.deep.members([
            [3, 1],
            [4, 1],
            [2, 2],
            [3, 2],
        ]);
    });
});

describe('.newIBlock()', () => {
    "use strict";

    it('should build a new FallingPiece', () => {
        let fallingPiece = FallingPiece.newIBlock();

        expect(fallingPiece).to.be.an.instanceof(FallingPiece);
    });
});