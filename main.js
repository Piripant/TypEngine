/// <reference path="Scene.ts" />
var scene;
window.onload = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dl.dropboxusercontent.com/u/81666488/Test1.txt", false);
    xhttp.send();
    scene = new Scene.Scene();
    scene.LoadFromString(xhttp.responseText);
    var el = document.getElementById('content');
};
//# sourceMappingURL=main.js.map