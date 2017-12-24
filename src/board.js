function buildArray(x, y) {
    let theArray = new Uint8Array(y);

    for (let i of new Array(x).keys()) {
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
        console.log("Checking validity of location " + location);

        if (location.x < 1 || location.y < 1) {
            return false;
        }

        if (location.x > this.width || location.y > this.height) {
            return false;
        }

        return this.stateAtLocation(location) === EMPTY;
    }

    getNonEmptyLocations() {

    }

    stateAtLocation(location) {
        return this.board[location.x - 1][location.y - 1];
    }
}

export default Board;