var Scene;
(function (Scene_1) {
    var Scene = (function () {
        function Scene() {
            this.gameObjects = [];
            this.renderers = [];
        }
        Scene.prototype.LoadFromString = function (file) {
            var line_props = file.split("\n");
            var unders_props = [[]];
            var comp_props = [[[]]];
            for (var i = 0; i < line_props.length; i++) {
                this.gameObjects[i] = new GameObject();
                unders_props[i] = line_props[i].split(" ");
                this.gameObjects[i].name = unders_props[i][0];
                for (var j = 0; j < unders_props[i].length; j++) {
                    comp_props[i][j] = unders_props[i][j].split(",");
                    this.createComponent(comp_props[i][j], i);
                }
            }
            this.gameObjects[0].GetComponent(Transform);
            this.gameObjects[0].GetComponent(Transform).x = 2;
            console.log(this.gameObjects[0].GetComponent(Transform).x);
            console.log(this.gameObjects[0].GetComponent(Renderer).sprite.position.x);
        };
        Scene.prototype.createComponent = function (par, i) {
            try {
                switch (par[0]) {
                    case "Transform":
                        this.gameObjects[i].components.push(new Transform(parseFloat(par[1]), parseFloat(par[2]), parseFloat(par[3]), parseFloat(par[4]), parseFloat(par[5])));
                        this.gameObjects[i].GetComponent(Transform).gameObject = this.gameObjects[i];
                        break;
                    case "Renderer":
                        this.gameObjects[i].components.push(new Renderer(par[1]));
                        this.gameObjects[i].GetComponent(Renderer).gameObject = this.gameObjects[i];
                }
            }
            catch (e) {
                console.log(e);
                alert("Error in loading scene file (couldn't find component)");
            }
        };
        Scene.prototype.CreateGameObject = function (name) {
            return new GameObject;
        };
        Scene.prototype.FindGameobject = function (name) {
            for (var i = 0; i < this.gameObjects.length; i++) {
                if (this.gameObjects[i].name == name) {
                    return this.gameObjects[i];
                }
            }
        };
        return Scene;
    })();
    Scene_1.Scene = Scene;
})(Scene || (Scene = {}));
//# sourceMappingURL=Scene.js.map