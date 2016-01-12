var scene: Scene;
class Scene {
    public gameObjects: GameObject[] = [];
    public DynamicRenders: Renderer[] = [];

    public LoadScene(SceneName: string, toEmpty?: boolean) {
        if (toEmpty) {
            this.DestroyAll();
        }
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", ResourcesLoader.scenes[SceneName], false);
        xhttp.send();
        var file = xhttp.responseText;
        this.LoadFromString(file);
    }

    public LoadFromString(file: string) {
        var line_props = file.split("\n");

        for (let i = 0; i < line_props.length; i++) {
            var obj = ResourcesLoader.CreateGameObjectFromStr(line_props[i]);
            this.gameObjects[i] = this.AddGameObject(obj);
        }
    }

    public AddGameObject(obj: GameObject): GameObject {
        var newObj: GameObject = obj.CloneGameObject();
        this.gameObjects.push(newObj);
        if (newObj.GetComponent<Transform>(Transform) != null && newObj.GetComponent<Renderer>(Renderer) != null) {
            newObj.GetComponent<Renderer>(Renderer).AddToRenderScene();
            if (newObj.GetComponent<Transform>(Transform).isStatic == false) {
                this.DynamicRenders.push(newObj.GetComponent<Renderer>(Renderer));
            }
        }

        var components = newObj.GetComponents<Script>(Script);
        for (let i in components) {
            components[i].OnSceneAdd();
        }

        return newObj;
    }

    public FindGameobjectByName(name: string): GameObject {
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].name === name) {
                return this.gameObjects[i];
            }
        }
    }
    
    public FindGameobjectByID(id: number): GameObject {
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].instanceID === id) {
                return this.gameObjects[i];
            }
        }
    }

    public Destroy(obj: GameObject) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.FindGameobjectByID(obj.instanceID).Destroy();
        }
    }

    public DestroyAll() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].Destroy();
        }
    }
}