import { Assets, Sprite } from 'pixi.js'
import { Character } from '@/game/Character'
import backgroundImage from '@/game/game-assets/background.png'
import characterImage from '@/game/game-assets/character.png'

export default class GameController {
	constructor(app, container) {
		this.resizeToWindow = this.resizeToWindow.bind(this)

		this.app = app
		this.$container = container
		this.character = null
	}

	async activateGame() {
		await this.app.init({
			width: this.$container.offsetWidth,
			height: this.$container.offsetHeight,
			background: 'coral'
		})

		!this.$container.firstElementChild ? this.$container.append(this.app.canvas) : null

		const [characterTexture, backgroundTexture] = await Promise.all([
			await Assets.load(characterImage),
			await Assets.load(backgroundImage)
		])

		const background = new Sprite(backgroundTexture)
		background.width = +this.$container.offsetWidth
		background.height = +this.$container.offsetHeight

		const character = new Character(characterTexture)
		character.height = background.height * 0.1
		character.width = character.height / 1.46 // Пропорция относительно высоты
		character.y = 200
		character.x = 20

		background.addChild(character)

		this.app.stage.addChild(background)

		this.toCenterStage()
		this.trackSize()
	}

	toCenterStage() {
		this.app.stage.position.set(
			0.5 * (this.app.screen.width - this.app.stage.width),
			0.5 * (this.app.screen.height - this.app.stage.height)
		)
	}

	resizeToWindow() {
		const prevW = this.app.stage.width
		const prevH = this.app.stage.height
		const newW = +this.$container.offsetWidth
		const newH = +this.$container.offsetHeight

		this.app.renderer.resize(newW, newH)

		const multiple = Math.min(newW / prevW, newH / prevH)

		this.app.stage.scale.set(
			this.app.stage.scale.x * multiple,
			this.app.stage.scale.y * multiple,
		)

		this.toCenterStage()
	}

	trackSize() {
		window.addEventListener('resize', this.resizeToWindow)
	}
}