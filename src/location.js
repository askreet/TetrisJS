class Location {
    constructor(x, y, state) {
        this.x = x;
        this.y = y;
        this.state = state;
    }

    left() {
        return new Location(this.x - 1, this.y, this.state);
    }

    right() {
        return new Location(this.x + 1, this.y, this.state);
    }

    up() {
        return new Location(this.x, this.y - 1, this.state);
    }

    down() {
        return new Location(this.x, this.y + 1, this.state);
    }

    toString() {
        return "Location(x=" + this.x + ", y=" + this.y + ", state=" + this.state + ")";
    }
}

export default Location;