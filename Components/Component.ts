class Component {
    public gameObject: GameObject;
    private _enabled: boolean = true;
    
    public get enabled() {
        return this._enabled;
    }
    
    public set enabled(value: boolean) {
        this._enabled = value;
        
        if (value) {
            this.OnEnable();
        }
        else {
            this.OnDisable();
        }
    }
    
    public OnDisable () { }
    
    public OnEnable () { }
    
    public Destroy () {
        this.OnDestroy();
        delete this;
    }
    
    public OnDestroy () { }
    
    public CloneComponent() { console.log("Unchanged clone"); }
}