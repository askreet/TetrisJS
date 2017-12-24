const maxX = 9;
const maxY = 21;
const minX = 0;
const minY = 0;

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

class Location {
    constructor(x, y) {
        this._x = clamp(x, minX, maxX);
        this._y = clamp(y, minY, maxY);
    }

    left() {
        return new Location(this._x - 1, this._y);
    }

    right() {
        return new Location(this._x + 1, this._y);
    }

    up() {
        return new Location(this._x, this._y - 1);
    }

    down() {
        return new Location(this._x, this._y + 1);
    }
}

export default Location;