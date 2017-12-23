let app = new PIXI.Application({ width: 800, height: 600 });

document.body.appendChild(app.view);

PIXI.loader
    .add("images/block16.png")
    .load(setup);

function setup() {
    let blockSprite = new PIXI.Sprite(PIXI.loader.resources["images/block16.png"].texture);

    app.stage.addChild(blockSprite);
}