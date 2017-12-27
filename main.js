import { Playfield, BORDER, BLUE, CYAN, GREEN, ORANGE, PURPLE, RED, YELLOW } from "./src/Playfield.js";
import { FallingPiece } from './src/FallingPiece.js';

let loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let app = new PIXI.Application({ width: 800, height: 600 });
let keyListener = new window.keypress.Listener();
let gameState = {
    lastDrop: performance.now(),
    dropTime: 1000, // "ticks" -- see Performance
    board: new Playfield(),
    fallingPiece: new FallingPiece([]),
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

function randWithin(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeNewFallingPiece() {
    let blockType = randWithin(1, 7);

    switch (blockType) {
        case 1:
            return FallingPiece.newIBlock();
        case 2:
            return FallingPiece.newOBlock();
        case 3:
            return FallingPiece.newTBlock();
        case 4:
            return FallingPiece.newSBlock();
        case 5:
            return FallingPiece.newZBlock();
        case 6:
            return FallingPiece.newJBlock();
        case 7:
            return FallingPiece.newLBlock();
        default:
            throw new RangeException("Unexpected value.");
    }

}

function moveFallingPieceDown() {
    if (!gameState.fallingPiece) return;

    if (gameState.fallingPiece.moveDownShouldAbsorb(gameState.board)) {
        gameState.board.absorbFallingPiece(gameState.fallingPiece);
        gameState.fallingPiece = makeNewFallingPiece();
    } else {
        gameState.fallingPiece.down();
    }
}

function setup() {
    "use strict";

    onKeyDown('a', function() {
        if (gameState.fallingPiece) gameState.fallingPiece.attemptLeft(gameState.board);
    });
    onKeyDown('s', function() {
        moveFallingPieceDown();
    });
    onKeyDown('d', function() {
        if (gameState.fallingPiece) gameState.fallingPiece.attemptRight(gameState.board);
    });
    onKeyDown('w', function() {
        if (gameState.fallingPiece) gameState.fallingPiece.attemptRotate(gameState.board);
    })

    gameState.fallingPiece = makeNewFallingPiece();

    gameState.sprites.position.set(50, 90);

    app.stage.addChild(gameState.sprites);

    app.ticker.add(delta => update(delta));
}

function update(delta) {
    "use strict";
    let startUpdate = performance.now();

    if (startUpdate - gameState.lastDrop > gameState.dropTime) {
        moveFallingPieceDown();
        gameState.lastDrop = startUpdate;
    }

    gameState.sprites.removeChildren();

    gameState.board.occupiedCells().map(loc => createLocationSprite(loc))
        .forEach(sprite => gameState.sprites.addChild(sprite));

    gameState.fallingPiece.getCells().map(loc => createLocationSprite(loc))
        .forEach(sprite => gameState.sprites.addChild(sprite));

    // let t = (performance.now() - startUpdate) / 1000;

    // console.log("Completed game update in " + t + "ms (delta=" + delta + ")");
}

function createLocationSprite(location) {
    let sprite = new Sprite(resources.block16.texture);

    let xPos = location.x * 16;
    let yPos = location.y * 16;
    sprite.position.set(xPos, yPos);

    sprite.tint = tintForState(location.state);

    return sprite;
}

function tintForState(state) {
    "use strict";

    switch (state) {
        case CYAN:
            return 0x00FFFF;
        case YELLOW:
            return 0xFFFF00;
        case PURPLE:
            return 0xFF00FF;
        case GREEN:
            return 0x00FF00;
        case RED:
            return 0xFF0000;
        case BLUE:
            return 0x0000FF;
        case ORANGE:
            return 0xFFA500;
        case BORDER:
            return 0x444444;
    }

}
