import { Button } from '@/game/Button'
import GameController from '@/game/GameController'

export class StartBtn extends Button {
	constructor(texture) {
		super(texture)
		this.height = GameController.DS.height * 0.2
		this.width = this.height * 2.1
		this.anchor.set(0.5)
		this.position.set(
			GameController.DS.width * 0.5,
			GameController.DS.height * 0.5,
		)
	}

	startPointerDown() {
		this.pointerUp(() => {
			this.destroy()
			GameController.GAME_EMITTER.emit(GameController.START_GAME)
		})
	}

	activateCustomEvents() {
		this.on('pointerup', this.startPointerDown)
	}
}