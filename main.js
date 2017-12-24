import { Board, CYAN, BORDER } from './src/board.js';
import Ghost from './src/ghost.js';
import Location from './src/location.js';

let loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let app = new PIXI.Application({ width: 800, height: 600 });
let keyListener = new window.keypress.Listener();
let gameState = {
    lastDrop: performance.now(),
    dropTime: 1000, // "ticks" -- see Performance
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

function makeNewGhost() {
    gameState.ghost = new Ghost([
        new Location(1, 1, CYAN),
        new Location(1, 2, CYAN),
        new Location(2, 2, CYAN),
        new Location(2, 3, CYAN),
    ]);
}

function moveGhostDown() {
    if (!gameState.ghost) return;

    if (gameState.ghost.moveDownShouldAbsorb(gameState.board)) {
        gameState.board.absorbGhost(gameState.ghost);
        makeNewGhost();
    } else {
        gameState.ghost.down();
    }
}

function setup() {
    "use strict";

    onKeyDown('a', function() {
        if (gameState.ghost) gameState.ghost.attemptLeft(gameState.board);
    });
    onKeyDown('s', function() {
        moveGhostDown();
    });
    onKeyDown('d', function() {
        if (gameState.ghost) gameState.ghost.attemptRight(gameState.board);
    });

    makeNewGhost();

    gameState.sprites.position.set(50, 90);

    app.stage.addChild(gameState.sprites);

    app.ticker.add(delta => update(delta));

    console.log("Setup complete!");
}

function update(delta) {
    "use strict";

    let startUpdate = performance.now();

    if (startUpdate - gameState.lastDrop > gameState.dropTime) {
        moveGhostDown();
        gameState.lastDrop = startUpdate;
    }

    gameState.sprites.removeChildren();

    createBoardSprites(gameState.board, sprite => gameState.sprites.addChild(sprite));
    createGhostSprites(gameState.ghost, sprite => gameState.sprites.addChild(sprite));

    // let t = (performance.now() - startUpdate) / 1000;

    // console.log("Completed game update in " + t + "ms (delta=" + delta + ")");
}

function createGhostSprites(ghost, callback) {
    for (let location of ghost.locations) {
        let sprite = new Sprite(resources.block16.texture);

        let xPos = location.x * 16;
        let yPos = location.y * 16;
        sprite.position.set(xPos, yPos);

        callback(sprite);
    }
}

function createBoardSprites(board, callback) {
    "use strict";

    for (let location of board.occupiedSpaces()) {
        let sprite = new Sprite(resources.block16.texture);

        let xPos = location.x * 16;
        let yPos = location.y * 16;
        sprite.position.set(xPos, yPos);

        switch (location.state) {
            case CYAN:
                sprite.tint = 0x00FFFF;
                break;
            case BORDER:
                sprite.tint = 0x444444;
                break;
        }

        callback(sprite);
    }
}
