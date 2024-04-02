import { Sprite } from 'pixi.js'
import GameController from '@/game/GameController'

export class GameNumber extends Sprite {
	constructor(texture) {
		super(texture)

		this.height = GameController.DS.height * 0.3
		this.width = this.height / 1.44
		this.anchor.set(0.5)
		this.position.set(
			GameController.DS.width * 0.5,
			GameController.DS.height * 0.5
		)
	}
}