import {PieceBag} from "../src/PieceBag.js";
import {FallingPiece} from "../src/FallingPiece.js";

function firstNPiecesOfBag(number) {
    let pieceBag = new PieceBag();

    let pieces = [];
    for (let i = 0; i < number; i++) {
        pieces.push(pieceBag.takePiece());
    }
    return pieces;
}

function pieceDistribution(pieces) {
    let pieceTypes = {};
    for (let piece of pieces) {
        if (piece.tetrominoType in pieceTypes) {
            pieceTypes[piece.tetrominoType]++;
        } else {
            pieceTypes[piece.tetrominoType] = 1;
        }
    }
    return pieceTypes;
}

describe('PieceBag', () => {
    "use strict";
    it('should produce infinite pieces', () => {
        let pieceBag = new PieceBag();

        let pieces = [];
        for (let i = 0; i < 100; i++) {
            let newPiece = pieceBag.takePiece();
            pieces.push(newPiece);

            expect(newPiece).to.be.an.instanceof(FallingPiece);
        }

        expect(pieces.length).to.equal(100);
    });

    it('should have even piece distribution with 7 pieces', () => {
        let pieces = firstNPiecesOfBag(7);
        let pieceTypes = pieceDistribution(pieces);

        expect(pieceTypes).to.deep.equal({
            I: 1, J: 1, L: 1, O: 1, S: 1, Z: 1, T:1
        });
    });

    it('should have even piece distribution with 14 pieces', () => {
        let pieces = firstNPiecesOfBag(14);
        let pieceTypes = pieceDistribution(pieces);

        expect(pieceTypes).to.deep.equal({
            I: 2, J: 2, L: 2, O: 2, S: 2, Z: 2, T:2
        });
    });

    it('should have even piece distribution with 21 pieces', () => {
        let pieces = firstNPiecesOfBag(21);
        let pieceTypes = pieceDistribution(pieces);

        expect(pieceTypes).to.deep.equal({
            I: 3, J: 3, L: 3, O: 3, S: 3, Z: 3, T:3
        });
    });

    describe('.peekNextPiece()', () => {
        it ('should show the next piece without removing it', ()=> {
            let pieceBag = new PieceBag();

            for (let i = 0; i < 100; i++) {
                let peekedPiece = pieceBag.peekNextPiece();
                let takenPiece = pieceBag.takePiece();

                expect(peekedPiece.tetrominoType).to.equal(takenPiece.tetrominoType);
            }
        });
    });
});