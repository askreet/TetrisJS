class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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

    toString() {
        return "Location(x=" + this.x + ", y=" + this.y + ")";
    }
}

export default Location;