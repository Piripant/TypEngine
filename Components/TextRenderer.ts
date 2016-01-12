class TextRenderer extends Renderer {
    public sprite: PIXI.Text;

    constructor(text: string[] = []) {
        super();
        this.sprite = new PIXI.Text(text[0]);
    }

    public CloneComponent(): TextRenderer {
        var cloneRenderer = new TextRenderer([this.sprite.text]);
        cloneRenderer.sprite.anchor.set(this.sprite.anchor.x, this.sprite.anchor.y);
        cloneRenderer.sprite.position.set(this.sprite.position.x, this.sprite.position.y);
        cloneRenderer.sprite.scale.set(this.sprite.scale.x, this.sprite.scale.y);
        cloneRenderer.sprite.rotation = this.sprite.rotation;
        cloneRenderer.sprite.text = this.sprite.text;
        return cloneRenderer;
    }
}