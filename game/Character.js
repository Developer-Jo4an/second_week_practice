import { Sprite } from 'pixi.js'
import GameController from '@/game/GameController'
import { gsap } from 'gsap'

export class Character extends Sprite {
	SPEED = 1
	SPEED_MULTIPLE = 0.00025
	ROTATION_MULTIPLE = 0.012

	constructor(texture, area) {
		super(texture)
		this.characterBounce = this.characterBounce.bind(this)

		this.area = area
		this.height = GameController.DS.width * 0.1
		this.width = GameController.DS.width * 0.1
		this.anchor.set(0.5)
		this.position.set(
			GameController.DS.width * 0.3,
			GameController.DS.height * 0.5,
		)
	}

	isCollusion() {
		return (
			this.y + this.height * 0.25 >= GameController.DS.height
			||
			this.y - this.height * 0.25 <= 0
		)
	}

	characterBounce() {
		const toY = this.y - GameController.DS.height * 0.15
		const toRotation = this.rotation - 0.85 <= -0.3 ? -0.3 : this.rotation - 0.95

		gsap.to(this.position, {
			duration: 0.4,
			y: toY,
			ease: 'power2.out',
			onComplete: () => {
				this.SPEED = 1
			}
		})
		gsap.to(this, {
			duration: 0.3,
			rotation: toRotation,
			ease: 'power2.out',
		})
	}


	characterMove() {
		this.area.on('pointerdown', this.characterBounce)

		const moveAnimation = () => {
			if (!this.isCollusion()) {
				const toRotation = this.rotation + this.ROTATION_MULTIPLE
				this.rotation = toRotation <= 1.1 ? toRotation : 1.1

				this.SPEED += this.SPEED_MULTIPLE

				this.y = (this.y + GameController.DS.height / 640) * this.SPEED
				return
			}
			this.area.off('pointerdown', this.characterBounce)
			gsap.ticker.remove(moveAnimation)
		}

		gsap.ticker.add(moveAnimation)
	}
}