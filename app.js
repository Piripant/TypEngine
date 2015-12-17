var Component = (function () {
    function Component() {
    }
    return Component;
})();
var scene;
window.onload = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dl.dropboxusercontent.com/u/81666488/Test1.txt", false);
    xhttp.send();
    scene = new Scene();
    SceneRenderer.init();
    scene.LoadFromString(xhttp.responseText);
    var el = document.getElementById('content');
};
var GameObject = (function () {
    function GameObject() {
        this.components = [];
        this.name = "";
    }
    GameObject.prototype.GetComponent = function (component) {
        for (var i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof component) {
                return this.components[i];
            }
        }
        return null;
    };
    GameObject.prototype.GetComponents = function (component) {
        var components = [];
        for (var i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof component) {
                components.push(this.components[i]);
            }
        }
        return components;
    };
    GameObject.prototype.AddComponent = function (component, pars) {
        console.log(typeof component);
        if (typeof component != 'string') {
            if (this.GetComponent(component) === null) {
                switch (component) {
                    case Transform:
                        this.components.push(new Transform(pars[0], pars[1], pars[2], pars[3], pars[4], pars[5]));
                        this.components[this.components.length - 1].gameObject = this;
                        break;
                    case Renderer:
                        this.components.push(new Renderer(pars[0]));
                        if (!this.GetComponent(Transform).isStatic) {
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
    };
    return GameObject;
})();
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
        SceneRenderer.stage.addChild(this.sprite);
    }
    Renderer.prototype.updateTransform = function () {
        //Make references to transform.x and transform.y
        var transform = this.gameObject.GetComponent(Transform);
        this.sprite.position.set(transform.x, transform.y);
        this.sprite.scale.set(transform.scale_x, transform.scale_y);
        this.sprite.rotation = transform.rotation;
    };
    return Renderer;
})(Component);
var Scene = (function () {
    function Scene() {
        this.gameObjects = [];
        this.DynamicRenders = [];
    }
    Scene.prototype.LoadFromString = function (file) {
        var line_props = file.split("\n");
        var unders_props = [[]];
        var comp_props = [[[]]];
        for (var i = 0; i < line_props.length; i++) {
            this.gameObjects[i] = new GameObject();
            unders_props[i] = line_props[i].split(" ");
            this.gameObjects[i].name = unders_props[i][0];
            for (var j = 1; j < unders_props[i].length; j++) {
                comp_props[i] = [];
                comp_props[i][j] = unders_props[i][j].split(",");
                this.createComponent(comp_props[i][j], i);
            }
        }
    };
    Scene.prototype.createComponent = function (par, i) {
        try {
            switch (par[0]) {
                case "Transform":
                    this.gameObjects[i].AddComponent(Transform, [parseFloat(par[1]), parseFloat(par[2]), parseFloat(par[3]), parseFloat(par[4]), parseFloat(par[5]), par[6] === "true"]);
                    break;
                case "Renderer":
                    this.gameObjects[i].AddComponent(Renderer, [par[1]]);
                    break;
                default:
                    console.log(par[0]);
                    this.gameObjects[i].AddComponent(par[0], []);
                    break;
            }
        }
        catch (e) {
            console.log(e);
            alert("Error in loading scene file (couldn't find or initializate the component: " + par[0]);
        }
    };
    Scene.prototype.CreateGameObject = function (name) {
        return new GameObject;
    };
    Scene.prototype.FindGameobject = function (name) {
        for (var i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].name === name) {
                return this.gameObjects[i];
            }
        }
    };
    return Scene;
})();
var SceneRenderer;
(function (SceneRenderer_1) {
    var SceneRenderer;
    function init() {
        SceneRenderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
        document.body.appendChild(SceneRenderer.view);
        SceneRenderer_1.stage = new PIXI.Container();
        Render();
    }
    SceneRenderer_1.init = init;
    function Render() {
        requestAnimationFrame(Render);
        SceneRenderer.render(SceneRenderer_1.stage);
        for (var i = 0; i < scene.gameObjects.length; i++) {
            var components = scene.gameObjects[i].GetComponents(Script);
            for (var j = 0; j < components.length; j++) {
                components[j].FrameUpdate();
            }
        }
        for (var i = 0; i < scene.DynamicRenders.length; i++) {
            scene.DynamicRenders[i].updateTransform();
        }
    }
})(SceneRenderer || (SceneRenderer = {}));
var Script = (function (_super) {
    __extends(Script, _super);
    function Script() {
        _super.apply(this, arguments);
    }
    Script.prototype.Start = function () {
    };
    Script.prototype.FrameUpdate = function () {
        alert("not what you wanted");
    };
    return Script;
})(Component);
var Transform = (function (_super) {
    __extends(Transform, _super);
    function Transform(xpos, ypos, rot, sx, sy, statc) {
        _super.call(this);
        this.scale_x = 1;
        this.scale_y = 1;
        this.rotation = 0;
        this.x = xpos || 0;
        this.y = ypos || 0;
        this.rotation = rot || 0;
        this.scale_x = sx || 0;
        this.scale_y = sy || 0;
        this.isStatic = statc || false;
    }
    Transform.prototype.translate = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    return Transform;
})(Component);
var UserScript = (function (_super) {
    __extends(UserScript, _super);
    function UserScript() {
        _super.apply(this, arguments);
    }
    UserScript.prototype.FrameUpdate = function () {
        this.gameObject.GetComponent(Transform).x *= 2;
        console.log("Updating");
    };
    return UserScript;
})(Script);
//# sourceMappingURL=app.js.map