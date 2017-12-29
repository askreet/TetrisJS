import {FallingPiece} from "./FallingPiece.js";
import {CellBox4} from "./CellBox4.js";
import {BLUE, CYAN, GREEN, ORANGE, PURPLE, RED, YELLOW} from "./Playfield.js";
import {CellBox3} from "./CellBox3.js";

export function newIBlock() {
    return new FallingPiece(
        "I",
        new CellBox4(
            [
                0, 0, 0, 0,
                1, 1, 1, 1,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            CYAN,
            3
        )
    );
}

export function newOBlock() {
    return new FallingPiece(
        "O",
        new CellBox4(
            [
                0, 0, 0, 0,
                0, 1, 1, 0,
                0, 1, 1, 0,
                0, 0, 0, 0,
            ],
            YELLOW,
            3
        )
    );
}

export function newTBlock() {
    return new FallingPiece(
        "T",
        new CellBox3(
            [
                0, 1, 0,
                1, 1, 1,
                0, 0, 0,
            ],
            PURPLE,
            3
        )
    );
}

export function newSBlock() {
    return new FallingPiece(
        "S",
        new CellBox3(
            [
                0, 1, 1,
                1, 1, 0,
                0, 0, 0,
            ],
            GREEN,
            3
        )
    );
}

export function newZBlock() {
    return new FallingPiece(
        "Z",
        new CellBox3(
            [
                1, 1, 0,
                0, 1, 1,
                0, 0, 0,
            ],
            RED,
            3
        )
    );
}

export function newJBlock() {
    return new FallingPiece(
        "J",
        new CellBox3(
            [
                1, 0, 0,
                1, 1, 1,
                0, 0, 0,
            ],
            BLUE,
            3
        )
    );
}

export function newLBlock() {
    return new FallingPiece(
        "L",
        new CellBox3(
            [
                0, 0, 1,
                1, 1, 1,
                0, 0, 0,
            ],
            ORANGE,
            3
        )
    );
}

