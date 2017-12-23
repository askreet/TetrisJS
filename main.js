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

function createBoardSprites(board) {
    let boardSprites = new Array(board.height * board.width);

    for (let [x, y] of board.positions()) {
        let sprite = new Sprite(resources.block16.texture);

        sprite.position.set(x * 16, y * 16);

        boardSprites.push(sprite);
    }

    return boardSprites;
}

function setup() {
    "use strict";

    let board = new Board();
    let boardSprites = createBoardSprites(board);

    for (let sprite of boardSprites) {
        app.stage.addChild(sprite);
    }

    console.log("Setup complete!");
}
