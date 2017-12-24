function buildArray(x, y) {
    let theArray = new Array(y);

    for (let i = 0; i < y; i++) {
        theArray[i] = new Uint8Array(x);
    }

    return theArray;
}

const EMPTY = 0;
const NOT_EMPTY = 1;
// EMPTY = 0;
// CYAN = 1;
// YELLOW = 2;
// PURPLE = 3;
// GREEN = 4;
// RED = 5;
// BLUE = 6;
// ORANGE = 7;

class Board {
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

        for (let x=1; x < this.width; x++) {
            // floor
            spaces.push(new Location(x, this.height + 1));
        }

        return spaces;
    }

    stateAtLocation(location) {
        return this.board[location.y - 1][location.x - 1];
    }
}

export default Board;