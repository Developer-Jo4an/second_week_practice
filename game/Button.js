import { Sprite } from 'pixi.js'
import { gsap } from 'gsap'

export class Button extends Sprite {
	MULTIPLE = 0.9
	DURATION = 0.2

	constructor(texture) {
		if (!Button.instance) Button.instance = true
		super(texture)
		this.pointerUp = this.pointerUp.bind(this)
		this.pointerDown = this.pointerDown.bind(this)

		this.interactive = true
		this.buttonMode = true

		this.activateEvents()
	}

	pointerDown() {
		const prevScalesX = this.scale.x
		const prevScalesY = this.scale.y

		gsap.to(
			this.scale, {
				duration: this.DURATION,
				x: prevScalesX * this.MULTIPLE,
				y: prevScalesY * this.MULTIPLE,
			}
		)
	}

	pointerUp(callback) {
		const prevScalesX = this.scale.x
		const prevScalesY = this.scale.y

		gsap.to(
			this.scale, {
				duration: this.DURATION / 2,
				x: prevScalesX / this.MULTIPLE,
				y: prevScalesY / this.MULTIPLE,
				onComplete: () => {
					this.visible = false
					callback()
				}
			}
		)
	}

	activateEvents() {
		this.on('pointerdown', this.pointerDown)
	}
}