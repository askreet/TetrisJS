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
    let boardSprites = [];

    for (let [x, y] of board.positions()) {
        let sprite = new Sprite(resources.block16.texture);

        sprite.position.set(x * 16, y * 16);

        boardSprites.push(sprite);
    }

    return boardSprites;
}

let state = {
    keys: {},
    clicks: {},
    mouse: {},
};

function setupListeners() {
    window.addEventListener("keydown", function (event) {
        state.keys[event.keyCode] = true;
    });

    window.addEventListener("keyup", function (event) {
        state.keys[event.keyCode] = false;
    });

    window.addEventListener("mousedown", function (event) {
        state.clicks[event.which] = {
            "clientX": event.clientX,
            "clientY": event.clientY
        };
    });

    window.addEventListener("mouseup", function (event) {
        state.clicks[event.which] = false;
    });

    window.addEventListener("mousemove", function (event) {
        state.mouse.clientX = event.clientX;
        state.mouse.clientY = event.clientY;
    });
}

function setup() {
    "use strict";

    setupListeners();

    requestAnimationFrame();

    let board = new Board();
    let boardSprites = createBoardSprites(board);

    for (let sprite of boardSprites) {
        app.stage.addChild(sprite);
    }

    console.log("Setup complete!");

    gameLoop();
}

function gameLoop() {
    "use strict";

    requestAnimationFrame(gameLoop);

    if (state.keys['q']) {
        app.destroy();
    }

    app.renderer.render();
}
