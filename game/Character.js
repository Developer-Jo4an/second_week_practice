import { Sprite } from 'pixi.js'
import { gsap } from 'gsap'
import GameController from '@/game/GameController'

export class Character extends Sprite {
	SPEED = 1
	SPEED_MULTIPLE = 0.0008
	ROTATION_MULTIPLE = 0.05

	constructor(texture) {
		super(texture)
		this.characterBounce = this.characterBounce.bind(this)
		this.moveAnimation = this.moveAnimation.bind(this)

		this.height = GameController.DS.width * 0.05
		this.width = GameController.DS.width * 0.05
		this.anchor.set(0.5)
		this.position.set(
			GameController.DS.width * 0.3,
			GameController.DS.height * 0.5,
		)
	}

	isCollusion() {
		const maxHeight = this.y + this.height * 0.29
		const minHeight = this.y - this.height * 0.29
		return (
			maxHeight >= GameController.DS.height || minHeight <= 0
		)
	}

	characterBounce() {
		gsap.to(this.position, {
			duration: 0.4,
			y: this.y - GameController.DS.height * 0.15,
			ease: 'power2.out',
			onComplete: () => this.SPEED = 1
		})
		gsap.to(this, {
			duration: 0.3,
			rotation: -0.3,
			ease: 'power2.out',
		})
	}

	moveAnimation() {
		if (this.isCollusion()) {
			GameController.GAME_EMITTER.emit(GameController.RESTART_GAME)
		}

		const toRotation = this.rotation + this.ROTATION_MULTIPLE
		this.rotation = toRotation <= 1.1 ? toRotation : 1.1

		this.SPEED += this.SPEED_MULTIPLE
		this.y = (this.y + GameController.DS.height / 150) * this.SPEED
	}

	characterMove() {
		window.addEventListener('pointerdown', this.characterBounce)
		gsap.ticker.add(this.moveAnimation)
	}

	characterRemove() {
		window.removeEventListener('pointerdown', this.characterBounce)
		gsap.ticker.remove(this.moveAnimation)
	}
}