/// <reference path="Scene.ts"/>
/// <reference path="SceneRenderer.ts"/>

var scene: Scene;

window.onload = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dl.dropboxusercontent.com/u/81666488/Test1.txt", false);
    xhttp.send();

    scene = new Scene();
    SceneRenderer.init();
    scene.LoadToEmptyFromString(xhttp.responseText);
    
    var el = document.getElementById('content');
};