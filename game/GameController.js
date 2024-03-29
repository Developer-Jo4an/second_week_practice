import { Assets } from 'pixi.js'
import { gsap } from 'gsap'
import { Character } from '@/game/Character'
import { StartBtn } from '@/game/StartBtn'
import { GameNumber } from '@/game/GameNumber'
import { Background } from '@/game/Background'

import backgroundImage from '@/game/game-assets/background.png'
import characterImage from '@/game/game-assets/character.png'
import startImage from '@/game/game-assets/start.png'
import timerOneImage from '@/game/game-assets/timer-one.png'
import timerTwoImage from '@/game/game-assets/timer-two.png'
import timerThreeImage from '@/game/game-assets/timer-three.png'

export default class GameController {
	static DS = {
		height: 550,
		width: 1000
	}

	constructor(app, container) {
		if (!GameController.instance) GameController.instance = true

		this.resizeToWindow = this.resizeToWindow.bind(this)
		this.activateTimer = this.activateTimer.bind(this)

		this.app = app
		this.$container = container
		this.character = null
	}

	async activateGame() {
		await this.app.init({
			width: +this.$container.offsetWidth,
			height: +this.$container.offsetHeight,
			background: 'coral'
		})

		this.app.stage.interactive = true

		!this.$container.firstElementChild ? this.$container.append(this.app.canvas) : null

		await this.createBackground()
		await this.createCharacter()
		await this.createStartButton()

		this.resizeToWindow()
		this.trackSize()
	}

	startGame() {

	}

	characterToStartPosition() {
		gsap.to(this.character.position, {
			duration: 1,
			x: GameController.DS.width * 0.5,
			onComplete: () => {
				this.startGame()
				this.character.characterMove()
			}
		})
	}

	async activateTimer() {
		const numbersArr =
			Object.values(await Assets.load([
				timerThreeImage,
				timerTwoImage,
				timerOneImage
			]))
			.map(texture => {
				const number = new GameNumber(texture)
				this.app.stage.addChild(number)
				return number
			})

		const toggleVisibleNumbers = key => {
			if (key === 0) return
			if (key === 4) {
				gsap.ticker.remove(timer)
				numbersArr.forEach(number => this.app.stage.removeChild(number))
				this.characterToStartPosition()
				return
			}

			const visible = numbersArr[key - 1].visible
			if (!visible) numbersArr[key - 1].visible = true

			if (!(numbersArr[key - 2]?.visible)) numbersArr[key - 2] = false
		}

		const timer = second => {
			const key = Number(second.toString()[0])
			toggleVisibleNumbers(key)
		}

		gsap.ticker.add(timer)
	}

	async createBackground() {
		const backgroundTexture = await Assets.load(backgroundImage)
		const background = new Background(backgroundTexture)
		this.app.stage.addChild(background)
	}

	async createCharacter() {
		const characterTexture = await Assets.load(characterImage)
		const character = new Character(characterTexture, this.app.stage)
		this.app.stage.addChild(this.character = character)
	}

	async createStartButton() {
		const startTexture = await Assets.load(startImage)
		const start = new StartBtn(startTexture)
		start.BUTTON_EVENT_EMITTER.on(start.BUTTON_POINTER_UP, this.activateTimer)
		this.app.stage.addChild(start)
	}

	resizeToWindow() {
		const newW = +this.$container.offsetWidth
		const newH = +this.$container.offsetHeight

		this.app.renderer.resize(newW, newH)
		const multiplier = Math.min(newH / GameController.DS.height, newW / GameController.DS.width)
		if (multiplier < 1) this.app.stage.scale.set(multiplier)

		this.app.stage.position.set(
			0.5 * (+this.$container.offsetWidth - this.app.stage.width),
			0.5 * (+this.$container.offsetHeight - this.app.stage.height),
		)
	}

	trackSize() {
		window.addEventListener('resize', this.resizeToWindow)
	}
}