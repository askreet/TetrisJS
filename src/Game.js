import {Playfield} from "./Playfield.js";
import {PieceBag} from "./PieceBag.js";

export class Game {
    constructor() {
        this._lastDrop = performance.now();
        this._dropTimeout = 1000;
        this._playfield = new Playfield();
        this._pieceBag = new PieceBag();
        this._fallingPiece = this._pieceBag.takePiece();
    }

    get playfieldCells() { return this._playfield.occupiedCells(); }
    get fallingPieceCells() { return this._fallingPiece.getCells(); }
    get nextPieceCells() { return this._pieceBag.peekNextPiece().getCells() }

    rotate() {
        this._fallingPiece.attemptRotate(this._playfield);
    }

    left() {
        this._fallingPiece.attemptLeft(this._playfield);
    }

    right() {
        this._fallingPiece.attemptRight(this._playfield);
    }

    down() {
        if (this._fallingPiece.moveDownShouldAbsorb(this._playfield)) {
            this._playfield.absorbFallingPiece(this._fallingPiece);
            this._fallingPiece = this._pieceBag.takePiece();
            return false;
        } else {
            this._fallingPiece.down();
            return true;
        }
    }

    update() {
        let now = performance.now();
        if (now - this._lastDrop > this._dropTimeout) {
            this.down();
            this._lastDrop = now;
        }
    }

    instantDrop() {
        while (true) {
            if (!this.down()) return;
        }
    }
}