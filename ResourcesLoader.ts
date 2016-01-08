/// <reference path="Scene.ts"/>
/// <reference path="./Components/Script.ts"/>

module ResourcesLoader {
    export var scenes = {};
    export var prefabs = {};
    var ResourceFile: string = "https://dl.dropboxusercontent.com/u/81666488/Res.txt";
    var mainScene: string = "Main";

    // On Window Load
    window.onload = () => {
        ResourcesLoader.LoadFromURL(ResourceFile, loading_done);
    };

    // Gets called when all the Resources are loaded
    var loading_done = () => {
        scene = new Scene();
        SceneRenderer.init();
        scene.LoadScene(mainScene);
    }

    export function LoadFromURL(url: string, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, false);
        xhttp.send();
        LoadFromString(xhttp.responseText, callback);
    }

    export function LoadFromString(file: string, callback) {
        var file_list = file.split("\n");
        scenes = getDict(file_list[0]);
        var prefabs_dict = getDict(file_list[1]);
        prefabs = makePrefabs(prefabs_dict);
        callback();
    }

    function getDict(line: string) {
        var line_list = line.split(" ");
        var dict: { [id: string]: string } = {};
        for (var i in line_list) {
            var temp = line_list[i].split(",");
            dict[temp[0]] = temp[1];
            console.log(dict);
        }
        return dict;
    }

    // Makes a GameObject class instance, NOTHING SCENE REALTED
    export function CreateGameObjectFromStr(data: string): GameObject {
        var space_props = data.split(" ");
        if (space_props[0] != "__Prefab__") {
            var gameObject = new GameObject();
            gameObject.name = space_props[0];

            // Makes ", list" with each "_ list (j = 1 because the 0 component is the name)
            var comp_props = [];
            for (var j = 1; j < space_props.length; j++) {
                comp_props[j] = space_props[j].split(",");
                gameObject.AddComponentsFromStr(comp_props[j]);
            }

            return gameObject;
        }

        else {
            return prefabs[space_props[0]];
        }
    }

    function makePrefabs(dict) {
        var xhttp = new XMLHttpRequest();
        for (var i in dict) {
            xhttp.open("GET", dict[i], false);
            xhttp.send();
            dict[i] = CreateGameObjectFromStr(xhttp.responseText);
        }

        return dict;
    }
}