import {BLUE, CYAN, GREEN, ORANGE, PURPLE, RED, YELLOW} from "./board.js";
import Location from "./location.js";

export class Ghost {
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

    down() {
        this.locations = this.locations.map(loc => loc.down());
    }

    moveDownShouldAbsorb(board) {
        let proposedNewLocation = this.locations.map(loc => loc.down());

        return !proposedNewLocation.every(loc => board.isValidEmptyLocation(loc));
    }

    static newIBlock() {
        return this.newGhost(1, 2, 2, 2, 3, 2, 4, 2, CYAN);
    }

    static newOBlock() {
        return this.newGhost(2, 1, 3, 1, 2, 2, 3, 2, YELLOW);
    }

    static newTBlock() {
        return this.newGhost(1, 2, 2, 2, 3, 2, 2, 1, PURPLE);
    }

    static newSBlock() {
        return this.newGhost(1, 2, 2, 2, 2, 1, 3, 1, GREEN);
    }

    static newZBlock() {
        return this.newGhost(1, 1, 2, 1, 2, 2, 3, 2, RED);
    }

    static newJBlock() {
        return this.newGhost(1, 1, 1, 2, 2, 2, 3, 2, BLUE);
    }

    static newLBlock() {
        return this.newGhost(1, 2, 2, 2, 3, 2, 3, 1, ORANGE);
    }

    static newGhost(x1, y1, x2, y2, x3, y3, x4, y4, state) {
        return new Ghost([
            new Location(x1, y1, state),
            new Location(x2, y2, state),
            new Location(x3, y3, state),
            new Location(x4, y4, state),
        ]);
    }

}
