/// <reference path="../pixi.js.d.ts"/>
/// <reference path="Transform.ts"/>
/// <reference path="Component.ts"/>

class SpriteRenderer extends Renderer {
    public sprite: PIXI.Sprite;

    // Fai che si possa fare riferimento alle texture col nome
    constructor(textureStr?) {
        super();
        if (typeof textureStr === "string") {
            var texture: PIXI.Texture = PIXI.Texture.fromImage(textureStr);
            this.sprite = new PIXI.Sprite(texture);
        }

        else {
            this.sprite = new PIXI.Sprite(textureStr);
        }
    }

    public CloneComponent(): SpriteRenderer {
        var cloneRenderer = new SpriteRenderer(this.sprite.texture);
        cloneRenderer.sprite.anchor.set(this.sprite.anchor.x, this.sprite.anchor.y);
        cloneRenderer.sprite.position.set(this.sprite.position.x, this.sprite.position.y);
        cloneRenderer.sprite.scale.set(this.sprite.scale.x, this.sprite.scale.y);
        cloneRenderer.sprite.rotation = this.sprite.rotation;
        return cloneRenderer;
    }
}