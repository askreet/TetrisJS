import {BLUE, BORDER, CYAN, GREEN, ORANGE, PURPLE, RED, YELLOW} from "./src/Playfield.js";
import {Game} from "./src/Game.js";

let loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let app = new PIXI.Application({width: 800, height: 600});
let keyListener = new window.keypress.Listener();
let game = new Game();
let sprites = new PIXI.Container();

document.body.appendChild(app.view);

loader
    .add("block16", "images/block16.png")
    .add("music", "https://askreet.nyc3.digitaloceanspaces.com/music.mp3")
    .load(setup);

function onKeyDown(key, callback) {
    "use strict";

    keyListener.register_combo({
        keys: key,
        on_keydown: callback,
    });
}

let musicPlaying = false;

export function toggleMusic() {
    if (musicPlaying) {
        musicPlaying = false;
        resources.music.sound.stop();
    } else {
        musicPlaying = true;
        resources.music.sound.play({ loop: true });
    }
}

function setup() {
    onKeyDown("a", () => game.left());
    onKeyDown("s", () => game.down());
    onKeyDown("d", () => game.right());
    onKeyDown("w", () => game.rotate());

    onKeyDown("left", () => game.left());
    onKeyDown("down", () => game.down());
    onKeyDown("right", () => game.right());
    onKeyDown("up", () => game.rotate());

    onKeyDown("space", () => game.instantDrop());

    sprites.position.set(50, 90);

    app.stage.addChild(sprites);

    app.ticker.add(delta => update(delta));

    toggleMusic();
}

function update(delta) {
    "use strict";
    game.update();

    sprites.removeChildren();

    game.playfieldCells.map(cell => createCellSprite(cell))
        .forEach(sprite => sprites.addChild(sprite));

    game.fallingPieceCells.map(cell => createCellSprite(cell))
        .forEach(sprite => sprites.addChild(sprite));

    game.nextPieceCells.map(cell => cell.translate(15, 0))
        .map(cell => createCellSprite(cell))
        .forEach(sprite => sprites.addChild(sprite));

    sprites.addChild(buildScoreTextSprite());
    sprites.addChild(buildLevelTextSprite());

    // let t = (performance.now() - startUpdate) / 1000;

    // console.log("Completed game update in " + t + "ms (delta=" + delta + ")");
}

function createCellSprite(cell) {
    let sprite = new Sprite(resources.block16.texture);

    let xPos = cell.x * 16;
    let yPos = cell.y * 16;
    sprite.position.set(xPos, yPos);

    sprite.tint = tintForState(cell.state);

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

function buildScoreTextSprite() {
    let scoreText = new PIXI.Text("Score: " + game.score,
        {fontFamily: "Arial", fontSize: 24, fill: 0xff1010, align: "center"}
    );

    scoreText.position.x = (15 * 16);
    scoreText.position.y = (4 * 16);

    return scoreText;
}

function buildLevelTextSprite() {
    let levelText = new PIXI.Text("Level: " + game.level,
        {fontFamily: "Arial", fontSize: 24, fill: 0xff1010, align: "center"}
    );

    levelText.position.x = (15 * 16);
    levelText.position.y = (6 * 16);

    return levelText;
}
