import { AnimatedSprite, Container, Texture } from "pixi.js";

export class CoinAnimation extends Container {
    constructor() {
        super();
        const coin = new AnimatedSprite([
            Texture.from("scatter_0.png"),
            Texture.from("scatter_1.png"),
            Texture.from("scatter_2.png"),
            Texture.from("scatter_3.png"),
            Texture.from("scatter_4.png"),
            Texture.from("scatter_0.png"),
            Texture.from("scatter_6.png"),
        ]);

        coin.loop = true;
        coin.animationSpeed = 0.2;
        coin.anchor.set(0.5);
        coin.play();
        this.addChild(coin);
    }
}
