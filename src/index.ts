import { BackgroundAnimation } from "./BackgroundAnimation";
import "pixi-spine";
import "./style.css";
import { Application, Assets } from "pixi.js";

const gameWidth = 800;
const gameHeight = 600;

console.log(
    `%cPixiJS V7\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
    "color: #ff66a1;",
);

const app = new Application<HTMLCanvasElement>({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    resizeCanvas();

    const animation = new BackgroundAnimation();
    animation.position.set(gameWidth / 2, gameHeight / 2);

    app.stage.addChild(animation);
    app.stage.interactive = true;
};

async function loadGameAssets(): Promise<void> {
    const manifest = {
        bundles: [
            {
                name: "coin",
                assets: [
                    {
                        name: "coin",
                        srcs: "./assets/spritesheet.json",
                    },
                ],
            },
        ],
    };

    await Assets.init({ manifest });
    await Assets.loadBundle(["coin"]);
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        const scale = Math.min(window.innerWidth / gameWidth, window.innerHeight / gameHeight);
        app.stage.position.set(
            (window.innerWidth - gameWidth * scale) * 0.5,
            (window.innerHeight - gameHeight * scale) * 0.5,
        );
        app.stage.scale.set(scale);
    };

    resize();

    window.addEventListener("resize", resize);
}
