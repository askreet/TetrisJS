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
        this.board = this.buildArray(10, 22);
    }

    private static buildArray(x, y) {
        let theArray = new Uint8Array(y);

        for (let i of new Array(x).keys()) {
            theArray[i] = new Uint8Array(x);
        }

        return theArray;
    }
}

export default Board;