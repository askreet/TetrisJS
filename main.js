import Board from './src/board.js';

let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let app = new Application({ width: 800, height: 600 });

document.body.appendChild(app.view);

loader
    .add("block16", "images/block16.png")
    .load(setup);

function setup() {
    "use strict";

    let blockSprite = new Sprite(resources.block16.texture);
    let board = new Board();

    drawBoard(board);

    console.log("Setup complete!");
}

function drawBoard(board) {
    "use strict";

    let thisX = 0;
    let thisY = 0;

    for (let row of board.board) {
        thisY++;

        for (let col of row) {
            thisX++;

            console.log("x=" + thisX + " y=" + thisY + " val=" + col);
        }

        thisX = 0;
    }
}
