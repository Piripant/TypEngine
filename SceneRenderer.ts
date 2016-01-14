/// <reference path="pixi.js.d.ts"/>

module SceneRenderer {
    export var MainRenderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    export var stage: PIXI.Container;
    
    export function init() {
        MainRenderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { backgroundColor: 0x1099bb });
        document.body.appendChild(MainRenderer.view);
        stage = new PIXI.Container();
        window.onresize = resize;
        Render();
    }

    function Render (): void {    
        requestAnimationFrame(Render);

        MainRenderer.render(stage);

        for (let i = 0; i < scene.gameObjects.length; i++) {
            let components = scene.gameObjects[i].GetComponents<Script>(Script);
            for (let j = 0; j < components.length; j++) {
                if (components[j].enabled) {
                    components[j].FrameUpdate();
                }
            }
        }

        for (let i = 0; i < scene.DynamicRenders.length; i++) {
            scene.DynamicRenders[i].updateTransform();
        }
        
    }
    
    var resize = () => {
        MainRenderer.resize(window.innerWidth, window.innerHeight);
    }

}