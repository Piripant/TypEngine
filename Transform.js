var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Transform = (function (_super) {
    __extends(Transform, _super);
    function Transform(xpos, ypos, rot, sx, sy) {
        _super.call(this);
        this.x = 0;
        this.y = 0;
        this.scale_x = 1;
        this.scale_y = 1;
        this.rotation = 0;
        this.x = xpos;
        this.y = ypos;
        this.rotation = rot;
        this.scale_x = sx;
        this.scale_y = sy;
    }
    Transform.prototype.translate = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    return Transform;
})(Component);
//# sourceMappingURL=Transform.js.map