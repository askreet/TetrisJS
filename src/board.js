function buildArray(x, y) {
    let theArray = new Uint8Array(y);

    for (let i of new Array(x).keys()) {
        theArray[i] = new Uint8Array(x);
    }

    return theArray;
}

class Board {
    // EMPTY = 0;
    // CYAN = 1;
    // YELLOW = 2;
    // PURPLE = 3;
    // GREEN = 4;
    // RED = 5;
    // BLUE = 6;
    // ORANGE = 7;

    constructor() {
        this.width = 10;
        this.height = 22;
        this.board = buildArray(this.width, this.height);
    }

    positions() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                yield [ x, y ];
            }
        }
    }
}

export default Board;