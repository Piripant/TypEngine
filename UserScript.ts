class UserScript extends Script {
    public FrameUpdate(): void {
        this.gameObject.GetComponent<Transform>(Transform).x *= 2;
        console.log("Updating");
    }
}