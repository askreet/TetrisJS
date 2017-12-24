const maxX = 10;
const maxY = 22;
const minX = 1;
const minY = 1;

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

class Location {
    constructor(x, y) {
        this.x = clamp(x, minX, maxX);
        this.y = clamp(y, minY, maxY);
    }

    left() {
        return new Location(this.x - 1, this.y);
    }

    right() {
        return new Location(this.x + 1, this.y);
    }

    up() {
        return new Location(this.x, this.y - 1);
    }

    down() {
        return new Location(this.x, this.y + 1);
    }
}

export default Location;