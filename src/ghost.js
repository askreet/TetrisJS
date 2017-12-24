class Ghost {
    constructor(locations) {
        this.locations = locations;
    }

    attemptRight(board) {
        this.locations = this.locations.map(loc => loc.right());
    }

    attemptLeft(board) {
        this.locations = this.locations.map(loc => loc.left());
    }

    attemptDown(board) {
        this.locations = this.locations.map(loc => loc.down());
    }
}

export default Ghost;