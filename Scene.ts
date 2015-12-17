class Scene {
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
                    console.log(par[0])
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