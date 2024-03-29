import { Button } from '@/game/Button'
import { EventEmitter } from 'pixi.js'
import GameController from '@/game/GameController'

export class StartBtn extends Button {
	BUTTON_POINTER_UP = 'startBtnPointerUp'
	BUTTON_EVENT_EMITTER = new EventEmitter()

	constructor(texture) {
		super(texture)
		this.height = GameController.DS.height * 0.2
		this.width = this.height * 2.1
		this.anchor.set(0.5)
		this.position.set(
			GameController.DS.width * 0.5,
			GameController.DS.height * 0.5,
		)
		this.activateCustomEvents()
	}


	startPointerDown() {
		this.pointerUp(() => {
			this.BUTTON_EVENT_EMITTER.emit(this.BUTTON_POINTER_UP)
		})
	}


	activateCustomEvents() {
		this.on('pointerup', this.startPointerDown)
	}
}