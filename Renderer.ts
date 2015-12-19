class Renderer extends Component {
    public sprite: PIXI.Sprite;
    

    constructor(textureFile: string) {
        super();
        var texture: PIXI.Texture = PIXI.Texture.fromImage(textureFile);
        this.sprite = new PIXI.Sprite(texture);
        SceneRenderer.stage.addChild(this.sprite);
    }

    public updateTransform() {
        //Make references to transform.x and transform.y

        var transform: Transform = this.gameObject.GetComponent<Transform>(Transform);
        this.sprite.position.set(transform.x, -transform.y);
        this.sprite.scale.set(transform.scale_x, transform.scale_y);
        this.sprite.rotation = transform.rotation;
    }
}