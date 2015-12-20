class GameObject {
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
            if (this.components[this.components.length - 1] instanceof Script) {
                this.GetComponent<Renderer>(Renderer).bindScriptEvents(this.components[this.components.length - 1]);
            }
        }
    }
}