import { Sprite } from 'pixi.js'
import { gsap } from 'gsap'
import GameController from '@/game/GameController'

export class ScoreLine extends Sprite {
	constructor(texture, character, position) {
		super(texture)
		this.moveAnimation = this.moveAnimation.bind(this)

		this.character = character
		this.anchor.set(0.5)
		this.width = 1
		this.height = GameController.DS.height

		this.y = 0
		this.x = position
	}

	moveAnimation() {
		this.position.set(this.x - 1.6, this.y)

		if (this.x <= this.character.x)  {
			GameController.GAME_EMITTER.emit(GameController.ADD_POINT, {
				type: GameController.ADD_POINT,
				scoreLine: this
			})
		}
	}

	scoreLineMove() {
		gsap.ticker.add(this.moveAnimation)
	}

	scoreLineRemove() {
		gsap.ticker.remove(this.moveAnimation)
	}
}