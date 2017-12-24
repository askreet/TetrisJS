class Ghost {
    constructor(locations) {
        this.locations = locations;
    }

    attemptRight(board) {
        let proposedNewLocations = this.locations.map(loc => loc.right());

        if (proposedNewLocations.every(loc => board.isValidEmptyLocation(loc))) {
            this.locations = proposedNewLocations;
            return true;
        }

        return false;
    }

    attemptLeft(board) {
        let proposedNewLocations = this.locations.map(loc => loc.left());

        if (proposedNewLocations.every(loc => board.isValidEmptyLocation(loc))) {
            this.locations = proposedNewLocations;
            return true;
        }

        return false;
    }

    attemptDown(board) {
        let proposedNewLocations = this.locations.map(loc => loc.down());

        if (proposedNewLocations.every(loc => board.isValidEmptyLocation(loc))) {
            this.locations = proposedNewLocations;
            return true;
        }

        return false;
    }
}

export default Ghost;