import {newIBlock, newJBlock, newLBlock, newOBlock, newSBlock, newTBlock, newZBlock} from "./Pieces.js";

function shuffle(array) {
    let remainingElements = array.length;
    let targetIndex, temporaryElement = 0;

    while (remainingElements) {
        targetIndex = Math.floor(Math.random() * remainingElements--);

        temporaryElement = array[remainingElements];
        array[remainingElements] = array[targetIndex];
        array[targetIndex] = temporaryElement;
    }

    return array;
}

function pushNewPieces(array) {
    let newPieces = [
        newIBlock(),
        newSBlock(),
        newZBlock(),
        newLBlock(),
        newJBlock(),
        newOBlock(),
        newTBlock()
    ];

    let shuffledPieces = shuffle(newPieces);

    shuffledPieces.forEach((piece) => {
       array.push(piece);
    });

    return array;
}

export class PieceBag {
    constructor() {
        this._pieces = pushNewPieces([]);
    }

    peekNextPiece() {
        return this._pieces[0];
    }

    takePiece() {
        let thePiece = this._pieces.shift();

        if (this._pieces.length < 2) {
            this._pieces = pushNewPieces(this._pieces);
        }

        return thePiece;
    }
}