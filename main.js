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
    let blockSprite = new Sprite(resources.block16.texture);

    app.stage.addChild(blockSprite);
}
