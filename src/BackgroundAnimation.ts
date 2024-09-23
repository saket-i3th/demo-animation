import { CoinAnimation } from "./CoinAnimation";
import { Container, Sprite, Text, Texture } from "pixi.js";
import gsap, { Linear } from "gsap";

export class BackgroundAnimation extends Container {
    private readonly SPAWN_INTERVAL = 0.5;
    private readonly ANIMATION_DURATION = 4;
    private readonly COINS_PER_SPAWN = 5;
    private readonly MAX_SPAWN_COUNT = 4;

    protected _spawnCount: number = 0;
    protected _removeCount: number = 0;

    public isPlaying: boolean = false;

    constructor() {
        super();

        const button: Container = new Container();

        const bg: Sprite = Sprite.from(Texture.WHITE);
        bg.anchor.set(0.5);
        bg.width = 100;
        bg.height = 40;
        button.addChild(bg);

        const txt: Text = new Text("Play");
        txt.position.set(-txt.width * 0.5, -txt.height * 0.5);
        button.addChild(txt);

        button.position.set(0, 250);
        button.interactive = true;
        button.interactiveChildren = true;
        button.addEventListener("click", () => {
            this.play();
        });
        this.addChild(button);
    }

    public play(): void {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this._spawnCount = 0;
            this._removeCount = 0;
            while (this._spawnCount < this.MAX_SPAWN_COUNT) {
                this._spawnCount++;
                gsap.delayedCall(this.SPAWN_INTERVAL * this._spawnCount, () => {
                    for (let index = 0; index < this.COINS_PER_SPAWN; index++) {
                        this.addCoin();
                    }
                });
            }
        }
    }

    protected addCoin(): void {
        const coinAnimation = new CoinAnimation();

        const initialScale = 0.2 + Math.random() * 0.3;
        const startRadius = 25 + Math.random() * 50;
        const theta = Math.random() * Math.PI * 2;
        const startX = Math.sin(theta) * startRadius;
        const startY = Math.cos(theta) * startRadius;
        coinAnimation.position.set(startX, startY);
        coinAnimation.scale.set(initialScale);
        this.addChild(coinAnimation);
        const finalScale = 0.6 + Math.random() * 0.4;
        const stopRadius = 600;
        const stopX = Math.sin(theta) * stopRadius;
        const stopY = Math.cos(theta) * stopRadius;

        gsap.to(coinAnimation, {
            duration: this.ANIMATION_DURATION,
            x: stopX,
            y: stopY,
            ease: Linear.easeOut,
            onComplete: () => {
                this.removeChild(coinAnimation);
                this._removeCount++;
                if (this._removeCount === this.MAX_SPAWN_COUNT) {
                    this.isPlaying = false;
                }
            },
        });

        gsap.to(coinAnimation.scale, {
            duration: this.ANIMATION_DURATION,
            x: finalScale,
            y: finalScale,
            ease: Linear.easeOut,
        });
    }
}
