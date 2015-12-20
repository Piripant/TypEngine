/// <reference path="SceneRenderer.ts"/>

module Input {
    
    //Keys
    var Keys = { "a": false, "b": false, "c": false, "d": false, "e": false, "f": false, "g": false, "h": false, "i": false, "j": false, "k": false, "l": false, "m": false, "n": false, "o": false, "p": false, "q": false, "r": false, "s": false, "t": false, "u": false, "v": false, "w": false, "x": false, "y": false, "z": false};

    //Automatically binded
    onkeydown = (event: KeyboardEvent) => {
        Keys[event.key] = true;
    }

    onkeyup = (event: KeyboardEvent) => {
        Keys[event.key] = false;
    }

    export function GetKey(key: string): boolean {
        return Keys[key];
    }

    //Mouse

    export module Mouse {
        var MouseButtons = { 0: false, 1: false, 2: false };
        export var x: number;
        export var y: number;

        //Automatically binded
        onmousemove = (event: MouseEvent) => {
            x = event.offsetX;
            y = event.offsetY;
        }

        onmousedown = (event: MouseEvent) => {
            MouseButtons[event.button] = true;
        }

        onmouseup = (event: MouseEvent) => {
            MouseButtons[event.button] = false;
        }

        export function GetMouseButton(button: number): boolean {
            return MouseButtons[button];
        }
    }
}