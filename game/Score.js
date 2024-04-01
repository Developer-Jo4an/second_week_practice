import { Text } from 'pixi.js'
import GameController from '@/game/GameController'

export class Score extends Text {
	constructor(defaultValue, options) {
		super(defaultValue, options)

		this.anchor.set(0.5)
		this.x = GameController.DS.width * 0.5
		this.y = 100
		this.zIndex = 1
	}
}