import {Grid} from "../src/Grid.js";
describe('Grid', () => {
    "use strict";

    it('has width and height properties', () => {
        let grid = new Grid(5, 6);

        expect(grid.height).to.equal(6);
        expect(grid.width).to.equal(5);
    });

    it('defaults values to 0', () => {
        let grid = new Grid(3, 3);

        expect(grid.at(1, 1)).to.equal(0);
    });

    describe('.set()', () => {
        it('sets values', () => {
            let grid = new Grid(2, 2);

            grid.set(1, 1, 4);
            expect(grid.at(1, 1)).to.equal(4);
        });
    });
});