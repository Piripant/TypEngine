class Transform extends Component {
    public x: number;
    public y: number;

    public scale_x: number = 1;
    public scale_y: number = 1;

    public rotation: number = 0;

    public isStatic: boolean;
    
    constructor(xpos?: number, ypos?: number, rot?: number, sx?: number, sy?: number, statc?: boolean) {
        super();
        this.x = xpos || 0;
        this.y = ypos || 0;
        this.rotation = rot || 0;
        this.scale_x = sx || 0;
        this.scale_y = sy || 0;
        this.isStatic = statc || false;
    }

    public translate(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }

}