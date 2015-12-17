///<reference path="pixi.js.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Renderer = (function (_super) {
    __extends(Renderer, _super);
    function Renderer(textureFile) {
        _super.call(this);
        var texture = PIXI.Texture.fromImage(textureFile);
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.position.x = this.gameObject.GetComponent(Transform).x;
        this.sprite.position.y = this.gameObject.GetComponent(Transform).y;
        this.sprite.addChild(SceneRenderer.stage);
    }
    return Renderer;
})(Component);
//# sourceMappingURL=Renderer.js.map