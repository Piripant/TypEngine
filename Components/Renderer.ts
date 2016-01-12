class Renderer extends Component {
    public sprite;

    constructor() {
        super();
        // this.AddToRenderScene();
    }
    
    public OnEnable () {
        SceneRenderer.stage.addChild(this.sprite);
    }
    
    public OnDisable () {
        SceneRenderer.stage.removeChild(this.sprite);
    }
    
    public AddToRenderScene() {
        SceneRenderer.stage.addChild(this.sprite);
    }

    public bindScriptEvents(script: Script) {
        this.sprite.interactive = true;
        this.sprite.addListener('mousedown', script.OnMouseDown);
        this.sprite.addListener('mouseup', script.OnMouseUp);
        this.sprite.addListener('mouseenter', script.OnMouseEnter);
        this.sprite.addListener('mouseleave', script.OnMouseLeave);

        this.sprite.addListener('mouseover', script.OnMouseOver);
        this.sprite.addListener('mouseout', script.OnMouseOut);
        this.sprite.addListener('mousemove', script.OnMouseMove);
        this.sprite.addListener('mousewheel', script.OnMouseWheel);
    }

    public updateTransform() {
        var transform: Transform = this.gameObject.GetComponent<Transform>(Transform);
        this.sprite.anchor.set(transform.scale_x / 2, transform.scale_y / 2);
        this.sprite.position.set(transform.x, -transform.y);
        this.sprite.scale.set(transform.scale_x, transform.scale_y);
        this.sprite.rotation = transform.rotation;
    }
}