/// <reference path="pixi.js.d.ts"/>

module SceneRenderer {
    export var SceneRenderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    export var stage: PIXI.Container;

    export function init() {
        SceneRenderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { backgroundColor: 0x1099bb });
        document.body.appendChild(SceneRenderer.view);
        stage = new PIXI.Container();
        Render();
    }

    function Render (): void {

        requestAnimationFrame(Render);

        SceneRenderer.render(stage);

        for (let i = 0; i < scene.gameObjects.length; i++) {
            let components = scene.gameObjects[i].GetComponents<Script>(Script);
            //sconsole.log(typeof scene.gameObjects[i].GetComponents);
            for (let j = 0; j < components.length; j++) {
                //console.log(components[j].gameObject.name);
                components[j].FrameUpdate();
            }
        }

        for (let i = 0; i < scene.DynamicRenders.length; i++) {
            scene.DynamicRenders[i].updateTransform();
        }
        
    }

}