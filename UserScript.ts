class UserScript extends Script {
    public FrameUpdate(): void {
        if (Input.GetKey("w")) {
            this.gameObject.GetComponent<Transform>(Transform).y += 1;
        }
        if (Input.GetKey("s")) {
            this.gameObject.GetComponent<Transform>(Transform).y -= 1;
        }
        if (Input.GetKey("d")) {
            this.gameObject.GetComponent<Transform>(Transform).x += 1;
        }
        if (Input.GetKey("a")) {
            this.gameObject.GetComponent<Transform>(Transform).x -= 1;
        }
    }
}