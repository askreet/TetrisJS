function offsetForCoordinates(grid, x, y) {
    "use strict";
    return (((y - 1) * grid.width) + x) - 1;
}

export class Grid {
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this._storage = new Uint8Array(width * height);
    }

    get height() { return this._height }
    get width() { return this._width }

    at(x, y) {
        return this._storage[offsetForCoordinates(this, x, y)];
    }

    set(x, y, state) {
        this._storage[offsetForCoordinates(this, x, y)] = state;
    }

    forEach(callback) {
        for(let x = 1; x <= this.width; x++) {
            for (let y = 1; y <= this.height; y++) {
                callback(x, y, this._storage[offsetForCoordinates(this, x, y)]);
            }
        }
    }
}