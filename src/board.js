import Location from './location.js';

function buildArray(x, y) {
    let theArray = new Array(y);

    for (let i = 0; i < y; i++) {
        theArray[i] = new Uint8Array(x);
    }

    return theArray;
}

export const EMPTY = 0;
export const CYAN = 1;
export const YELLOW = 2;
export const PURPLE = 3;
export const GREEN = 4;
export const RED = 5;
export const BLUE = 6;
export const ORANGE = 7;
export const BORDER = 8;

export class Board {
    constructor() {
        this.width = 10;
        this.height = 22;
        this.board = buildArray(this.width, this.height);
    }

    isValidEmptyLocation(location) {
        if (location.x < 1 || location.y < 1) {
            return false;
        }

        if (location.x > this.width || location.y > this.height) {
            return false;
        }

        return this.stateAtLocation(location) === EMPTY;
    }

    occupiedSpaces() {
        let spaces = [];

        for (let y=0; y < this.height + 1; y++) {
            // left wall
            spaces.push(new Location(0, y));

            // right wall
            spaces.push(new Location(this.width + 1, y));
        }

        for (let x=0; x < this.width + 2; x++) {
            // floor
            spaces.push(new Location(x, this.height + 1));
        }

        for (let location of this.everyLocation()) {
            if (this.stateAtLocation(location) !== EMPTY) {
                spaces.push(location);
            }
        }

        return spaces;
    }

    stateAtLocation(location) {
        return this.board[location.y - 1][location.x - 1];
    }

    setStateAtLocation(location, state) {
        console.log("Setting state " + state + " at " + location);
        this.board[location.y - 1][location.x - 1] = state;
    }

    * everyLocation() {
        for (let x = 1; x <= this.width; x++) {
            for (let y = 1; y <= this.height; y++) {
                yield new Location(x, y);
            }
        }
    }

    absorbGhost(ghost) {
        for (let location of ghost.locations) {
            this.setStateAtLocation(location, CYAN);
        }
    }
}
