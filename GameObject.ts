class GameObject {
    static lastID: number = 0;

    public components = [];
    public name: string = "";
    public instanceID: number;
    
    constructor() {
        this.instanceID = GameObject.lastID;
        GameObject.lastID++;
    }
    
    public Destroy () {
        for (let i in this.components) {
            this.components[i].OnDestroy();
        }
        
        delete this;
    }
    
    public CloneGameObject(): GameObject {
        var cloneObj: GameObject = new GameObject();
        cloneObj.name = this.name;
        
        for (let i in this.components) {
            cloneObj.components[i] = this.components[i].CloneComponent();
            cloneObj.components[i].gameObject = cloneObj;

            if (cloneObj.components[i] instanceof Script) {
                cloneObj.GetComponent<Renderer>(Renderer).bindScriptEvents(cloneObj.components[i]);
            }
            
        }

        return cloneObj;
    }

    public GetComponent<T>(component): T {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof <any>component) {
                return this.components[i];
            }
        }
        return null;
    }

    public GetComponents<T>(component): T[] {
        var components = [];
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof <any>component) {
                components.push(this.components[i]);
            }
        }

        return components;
    }

    //Remember to put [] around paramaters, usless it will fail, even if only one paramenter is needed: obj.AddComponent(SpriteRenderer, [texture])
    public AddComponent(component, pars?): void {
        //Checks if has already this component
        if (typeof component !== 'string') {
            if (this.GetComponent<Object>(component) === null) {
                // When evaluating components do not do any scene related stuff
                switch (component) {
                    case Transform:
                        this.components.push(new Transform(pars[0], pars[1], pars[2], pars[3], pars[4], pars[5]));
                        this.components[this.components.length - 1].gameObject = this;
                        break;

                    case SpriteRenderer:
                        this.components.push(new SpriteRenderer(pars[0]));
                        this.components[this.components.length - 1].gameObject = this;
                        this.components[this.components.length - 1].updateTransform();
                        break;

                }
            }
        }

        else {
            console.log(pars);
            
            var comp = new (<any>window[component])(pars);
            console.log(comp)
            console.log(new UserScript);
            this.components.push(comp);
            comp.gameObject = this;
            if (comp instanceof Script && this.GetComponent<Renderer>(Renderer) != null) {
                this.GetComponent<Renderer>(Renderer).bindScriptEvents(comp);
            }
        }
    }

    AddComponentsFromStr(par: string[]): void {
        try {
            switch (par[0]) {
                case "Transform":
                    this.AddComponent(Transform, [parseFloat(par[1]), parseFloat(par[2]), parseFloat(par[3]), parseFloat(par[4]), parseFloat(par[5]), par[6] === "true"]);
                    break;
                case "SpriteRenderer":
                    this.AddComponent(SpriteRenderer, [par[1]]);
                    break;

                default:
                    // There may be a \r char sometimes
                    console.log(par);
                    this.AddComponent(par[0].split("\r")[0], par.slice(1, par.length));
                    break;
            }
        }

        catch (e) {
            console.log(e);
            console.error("Error in loading scene file (couldn't find or initializate the component: " + par[0]);
        }
    }
    
    public DisableAll() {
        for (let i in this.components) {
            this.components[i].enabled = false;
        }
    }
    
    public EnableAll() {
        for (let i in this.components) {
            this.components[i].enabled = true;
        }
    }
}