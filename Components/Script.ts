/// <reference path="Component.ts"/>

class Script extends Component {    
    
    public OnSceneAdd(): void { }

    public FrameUpdate(): void { }

    public OnMouseDown = () => { }

    public OnMouseUp = () => { }

    public OnMouseEnter = () => { }

    public OnMouseLeave = () => { }

    public OnMouseOver = () => { }

    public OnMouseOut = () => { }

    public OnMouseMove = () => { }

    public OnMouseWheel = () => { }
    
    public CloneComponent() {
        return new (<any>this.constructor)();
    }
}