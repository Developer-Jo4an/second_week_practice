import { Sprite } from 'pixi.js'
import GameController from '@/game/GameController'

export class Background extends Sprite {
	constructor(texture) {
		super(texture)
		this.width = GameController.DS.width
		this.height = GameController.DS.height
	}
}