class Component {
    public gameObject: GameObject;
}
﻿class GameObject {
    public components = [];
    public name = "";

    public GetComponent<T>(component): T {
        for (var i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof component) {
                return this.components[i];
            }
        }
        return null;
    }

    public GetComponents<T>(component): T[] {
        var components = [];
        for (var i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof component) {
                components.push(this.components[i]);
            }
        }

        return components;
    }

    //Remember to put [] around paramaters, usless it will fail, even if only one paramenter is needed: obj.AddComponent(Renderer, [texture])
    public AddComponent(component, pars?): void {
        //Checks if has already this component
        if (typeof component != 'string') {
            if (this.GetComponent<Object>(component) === null) {
                switch (component) {
                    case Transform:
                        this.components.push(new Transform(pars[0], pars[1], pars[2], pars[3], pars[4], pars[5]));
                        this.components[this.components.length - 1].gameObject = this;
                        break;

                    case Renderer:
                        this.components.push(new Renderer(pars[0]));
                        if (!this.GetComponent<Transform>(Transform).isStatic) {
                            scene.DynamicRenders.push(this.components[this.components.length - 1]);
                        }
                        this.components[this.components.length - 1].gameObject = this;
                        this.components[this.components.length - 1].updateTransform();
                        break;

                }
            }
        }

        else {
            eval("this.components.push(new " + component + "());");
            this.components[this.components.length - 1].gameObject = this;
        }
    }
}
﻿module Input {
    var Keys = { "a": false, "b": false, "c": false, "d": false, "e": false, "f": false, "g": false, "h": false, "i": false, "j": false, "k": false, "l": false, "m": false, "n": false, "o": false, "p": false, "q": false, "r": false, "s": false, "t": false, "u": false, "v": false, "w": false, "x": false, "y": false, "z": false};

    export function GetKey(key: string) {
        return Keys[key];
    }

    onkeydown = (event: KeyboardEvent) => {
        Keys[event.key] = true;
    }

    onkeyup = (event: KeyboardEvent) => {
        Keys[event.key] = false;
    }

    document.addEventListener('keydown', onkeydown, false);
    document.addEventListener('keyup', onkeyup, false);
}
﻿var scene: Scene;

window.onload = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dl.dropboxusercontent.com/u/81666488/Test1.txt", false);
    xhttp.send();

    scene = new Scene();
    SceneRenderer.init();
    scene.LoadFromString(xhttp.responseText);
    
    var el = document.getElementById('content');
};
﻿class Renderer extends Component {
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
        this.sprite.position.set(transform.x, transform.y);
        this.sprite.scale.set(transform.scale_x, transform.scale_y);
        this.sprite.rotation = transform.rotation;
    }
}
﻿class Scene {
    public gameObjects: GameObject[] = [];
    public DynamicRenders: Renderer[] = [];

    public LoadFromString(file: string) {
        // Makes lines list
        var line_props = file.split("\n");
        var unders_props: string[][] = [[]];
        var comp_props: string[][][] = [[[]]];

        // Makes "_ list" with each "line list"
        for (var i = 0; i < line_props.length; i++) {
            this.gameObjects[i] = new GameObject();
            unders_props[i] = line_props[i].split(" ");
            this.gameObjects[i].name = unders_props[i][0];

            // Makes ", list" with each "_ list (j = 1 because the 0 component is the name)
            for (var j = 1; j < unders_props[i].length; j++) {
                comp_props[i] = [];
                comp_props[i][j] = unders_props[i][j].split(",");
                this.createComponent(comp_props[i][j], i);
            }
        }
    }

    private createComponent(par: string[], i: number) {
        try {
            switch (par[0]) {
                case "Transform":
                    this.gameObjects[i].AddComponent(Transform, [parseFloat(par[1]), parseFloat(par[2]), parseFloat(par[3]), parseFloat(par[4]), parseFloat(par[5]), par[6] === "true"]);
                    break;
                case "Renderer":
                    this.gameObjects[i].AddComponent(Renderer, [par[1]]);
                    break;

                default:
                    this.gameObjects[i].AddComponent(par[0], []);
                    break;

            }
        }
        catch (e) {
            console.log(e);
            alert("Error in loading scene file (couldn't find or initializate the component: " + par[0]);
            
        }
    }

    public CreateGameObject(name: string): GameObject {
        return new GameObject
    }

    public FindGameobject(name: string): GameObject {
        for (var i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].name === name) {
                return this.gameObjects[i];
            }
        }
    }
}
﻿module SceneRenderer {
    var SceneRenderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    export var stage: PIXI.Container;

    export function init() {
        SceneRenderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
        document.body.appendChild(SceneRenderer.view);
        stage = new PIXI.Container();
        Render();
    }

    function Render (): void {

        requestAnimationFrame(Render);

        SceneRenderer.render(stage);

        for (let i = 0; i < scene.gameObjects.length; i++) {
            let components = scene.gameObjects[i].GetComponents<Script>(Script);
            for (let j = 0; j < components.length; j++) {
                components[j].FrameUpdate();
            }
        }

        for (let i = 0; i < scene.DynamicRenders.length; i++) {
            scene.DynamicRenders[i].updateTransform();
        }
        
    }

}
﻿class Script extends Component {
    public Start(): void {
        
    }

    public FrameUpdate(): void {
        alert("not what you wanted");
    }
}
﻿class Transform extends Component {
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
