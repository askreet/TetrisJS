import {Playfield} from "./Playfield.js";
import {PieceBag} from "./PieceBag.js";

export class Game {
    constructor() {
        this._lastDrop = performance.now();
        this._playfield = new Playfield();
        this._pieceBag = new PieceBag();
        this._fallingPiece = this._pieceBag.takePiece();
        this._score = 0;
        this._level = 0;
        this._lineClears = 0;
    }

    get playfieldCells() { return this._playfield.occupiedCells(); }
    get fallingPieceCells() { return this._fallingPiece.getCells(); }
    get nextPieceCells() { return this._pieceBag.peekNextPiece().getCells() }

    get score() { return this._score; }
    get level() { return this._level; }

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
            this._absorbPiece();
            return false;
        } else {
            this._fallingPiece.down();
            return true;
        }
    }

    _absorbPiece() {
        let numberOfRowsCleared = this._playfield.absorbFallingPiece(this._fallingPiece);
        this._fallingPiece = this._pieceBag.takePiece();
        let rowsCleared = this._scoreForNRowsCleared(numberOfRowsCleared);
        this._score += rowsCleared;
        this._lineClears += rowsCleared;
        if (this._lineClears >= 10) {
            this._lineClears = 0;
            this._level++;
        }
    }

    _scoreForNRowsCleared(numberOfRowsCleared) {
        switch (numberOfRowsCleared) {
            case 0:
                return 0;
            case 1:
                return 100 * (this._level + 1);
            case 2:
                return 300 * (this._level + 1);
            case 3:
                return 500 * (this._level + 1);
            case 4:
                return 800 * (this._level + 1);
        }
    }

    update() {
        let now = performance.now();
        if (now - this._lastDrop > this.dropTimeout()) {
            this.down();
            this._lastDrop = now;
        }
    }

    instantDrop() {
        while (true) {
            if (!this.down()) return;
        }
    }

    dropTimeout() {
        return Math.min(50, 500 - ((this._level+1) * 50));
    }
}