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
    return GameObject;
})();
//# sourceMappingURL=GameObject.js.map