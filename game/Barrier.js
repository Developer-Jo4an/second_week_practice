import { Sprite } from 'pixi.js'
import { gsap } from 'gsap'
import { Character } from '@/game/Character'
import GameController from '@/game/GameController'

export class Barrier extends Sprite {
	constructor(texture, { direction, shift, between }, character) {
		super(texture)
		this.moveAnimation = this.moveAnimation.bind(this)

		this.character = character
		this.barrierType = direction
		this.anchor.set(0.5)
		this.height = GameController.DS.height
		this.width = GameController.DS.height * 0.15
		this.rotation = direction === GameController.TOP_BARRIER ? Math.PI : 0

		this.y = direction === GameController.TOP_BARRIER ?
			shift + between
			:
			GameController.DS.height - shift + between

		this.x = GameController.DS.width + this.width * 0.5
	}

	isCollusion() {
		const xResult =
			this.character.x + this.character.width * Character.COLLUSION_MULTIPLE >= this.x - this.width * 0.5
			&&
			this.character.x - this.character.width * Character.COLLUSION_MULTIPLE <= this.x + this.width * 0.5
		const yResult = this.barrierType === GameController.TOP_BARRIER ?
			this.character.y - this.character.height * Character.COLLUSION_MULTIPLE <= this.y + this.height * 0.5
			:
			this.character.y + this.character.height * Character.COLLUSION_MULTIPLE >= this.y - this.height * 0.5

		return (xResult && yResult)
	}

	isHidden() {
		return (
			this.x <= -this.width * 0.5
		)
	}

	moveAnimation() {
		this.position.set(this.x - 1.6, this.y)

		if (this.isCollusion()) {
			GameController.GAME_EMITTER.emit(GameController.RESTART_GAME)
			return
		}

		if (this.isHidden()) {
			GameController.GAME_EMITTER.emit(
				GameController.DISPATCH_BARRIERS, {
					type: GameController.DELETE_BARRIERS,
					barriersArr: [this]
				}
			)
		}
	}

	barrierMove() {
		gsap.ticker.add(this.moveAnimation)
	}

	barrierRemove() {
		gsap.ticker.remove(this.moveAnimation)
	}

}