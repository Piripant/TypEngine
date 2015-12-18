module Input {
    var Keys = { "a": false, "b": false, "c": false, "d": false, "e": false, "f": false, "g": false, "h": false, "i": false, "j": false, "k": false, "l": false, "m": false, "n": false, "o": false, "p": false, "q": false, "r": false, "s": false, "t": false, "u": false, "v": false, "w": false, "x": false, "y": false, "z": false};

    export function GetKey(key: string) {
        return Keys[key];
    }

    onkeydown = (event: KeyboardEvent) => {
        Keys[event.key] = true;
    }

    onkeyup = (event: KeyboardEvent) => {
        Keys[event.key] = false;
    }

    document.addEventListener('keydown', onkeydown, false);
    document.addEventListener('keyup', onkeyup, false);
}