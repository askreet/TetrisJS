import Board from './src/board.js';
import Ghost from './src/ghost.js';

let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let app = new Application({ width: 800, height: 600 });
let keyListener = new window.keypress.Listener();
let gameState = {
    lastDrop: performance.now(),
    dropTime: 1000000, // microseconds?
    board: new Board(),
    ghost: new Ghost(),
    sprites: new PIXI.Container(),
};

document.body.appendChild(app.view);

loader
    .add("block16", "images/block16.png")
    .load(setup);

function onKeyDown(key, callback) {
    "use strict";

    keyListener.register_combo({
        keys: key,
        on_keydown: callback,
    });
}

function setup() {
    "use strict";

    onKeyDown('a', function() {
        if (gameState.ghost) gameState.ghost.attemptLeft(board);
    });
    onKeyDown('s', function() {
        if (gameState.ghost) gameState.ghost.attemptDown(board);
    });
    onKeyDown('d', function() {
        if (gameState.ghost) gameState.ghost.attemptRight(board);
    });

    gameState.ghost = new Ghost([
        new Location(1, 1),
        new Location(1, 2),
        new Location(2, 2),
        new Location(2, 3),
    ]);

    app.ticker.add(delta => update(delta));

    console.log("Setup complete!");
}

function update(delta) {
    "use strict";

    let startUpdate = performance.now();

    if (performance.now() - gameState.lastDrop > gameState.dropTime) {
        drop();
    }

    gameState.ghost.update();
    // gameState.board.update();

    gameState.sprites.removeChildren();

    // addBoardSprites(board, gameState.sprites);
    addGhostSprites(ghost, gameState.sprites);

    let t = (performance.now() - startUpdate) / 1000;

    console.log("Completed game update in " + t + "ms");
}

function addGhostSprites(ghost, sprites) {
    for (location of ghost.locations) {
        let sprite = new Sprite(resources.block16.texture);

        sprite.position.set(location.x * 16, location.y * 16);

        sprites.addChild(sprite);
    }
}

function createBoardSprites(board) {
    let boardSprites = [];

    for (let [x, y] of board.positions()) {
        let sprite = new Sprite(resources.block16.texture);

        sprite.position.set(x * 16, y * 16);

        boardSprites.push(sprite);
    }

    return boardSprites;
}


function drop() {
    "use strict";

    console.log("Drop!");
}