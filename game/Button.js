import { Sprite } from 'pixi.js'
import { gsap } from 'gsap'

export class Button extends Sprite {
    MULTIPLE = 0.9
    DURATION = 0.2

    constructor(texture) {
        super(texture)
        this.pointerUp = this.pointerUp.bind(this)
        this.pointerDown = this.pointerDown.bind(this)

        this.cursor = 'pointer'

        this.interactive = true
        this.buttonMode = true
    }

    pointerDown() {
        gsap.to(this.scale, {
			duration: this.DURATION,
			x: this.scale.x * this.MULTIPLE,
			y: this.scale.y * this.MULTIPLE,
		})
    }

    pointerUp(callback) {
        gsap.to(
            this.scale, {
                duration: this.DURATION * 0.5,
                x: this.scale.x / this.MULTIPLE,
                y: this.scale.y / this.MULTIPLE,
                onComplete: () => callback ? callback() : null
            }
        )
    }

    activateEvents() {
        this.on('pointerdown', this.pointerDown)
    }
}