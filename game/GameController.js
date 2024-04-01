import { Assets, EventEmitter, Graphics, Texture } from 'pixi.js'
import { gsap } from 'gsap'
import { Character } from '@/game/Character'
import { StartBtn } from '@/game/StartBtn'
import { GameNumber } from '@/game/GameNumber'
import { Background } from '@/game/Background'
import { Barrier } from '@/game/Barrier'
import { Score } from '@/game/Score'
import { ScoreLine } from '@/game/ScoreLine'

import backgroundImage from '@/game/game-assets/background.png'
import characterImage from '@/game/game-assets/character.png'
import startImage from '@/game/game-assets/start.png'
import timerOneImage from '@/game/game-assets/timer-one.png'
import timerTwoImage from '@/game/game-assets/timer-two.png'
import timerThreeImage from '@/game/game-assets/timer-three.png'
import barrierImage from '@/game/game-assets/barrier.png'

gsap.ticker.fps(60)

export default class GameController {
    static DS = { height: 550, width: 1000 }

    static GAME_EMITTER = new EventEmitter()

    static START_GAME = 'START_GAME'
    static RESTART_GAME = 'RESTART_GAME'

    static DISPATCH_BARRIERS = 'DISPATCH_BARRIERS'
    static CREATE_BARRIERS = 'CREATE_BARRIERS'
    static DELETE_BARRIERS = 'DELETE_BARRIERS'

	static ADD_POINT = 'ADD_POINT'
	static DELETE_SCORE = 'DELETE_SCORE'

    constructor(app, container) {
        if (!GameController.instance) GameController.instance = true

        this.resizeToWindow = this.resizeToWindow.bind(this)
        this.startGame = this.startGame.bind(this)
        this.restartGame = this.restartGame.bind(this)
        this.barriersReducer = this.barriersReducer.bind(this)
	    this.scoreReducer = this.scoreReducer.bind(this)

        this.app = app
        this.$container = container

        this.character = null
	    this.score = null
        this.spawnInterval = null

        this.barriersArray = []
	    this.scoreLinesArray = []
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
        this.gameListen()
    }

    async startGame() {
        const numbersArr =
            Object.values(await Assets
            .load([timerThreeImage, timerTwoImage, timerOneImage]))
            .map(texture => new GameNumber(texture))

        let second = 0

        const startGameTimer = setInterval(() => {
            if (second === 3) {
                numbersArr[second - 1].destroy()
                clearInterval(startGameTimer)

                gsap.to(this.character.position, {
                    duration: 1,
                    x: GameController.DS.width * 0.5,
                    onComplete: () => {
                        this.character.characterMove()
                        this.createBarriers()
	                    this.createScore()
                    }
                })

                return
            }

            const futureNumber = numbersArr[second]
            this.app.stage.addChild(futureNumber)

            const prevNumber = numbersArr[second - 1]
            if (prevNumber) prevNumber.destroy()

            second++
        }, 1000)
    }

	saveRecord() {
		const currentRecord = window.localStorage.getItem('game-record')

		if (!currentRecord || +this.score.text > +currentRecord)
			window.localStorage.setItem('game-record', this.score.text)
	}

    restartGame() {
		this.saveRecord()

        this.character.characterRemove()
		this.scoreReducer({ type: GameController.DELETE_SCORE })

        this.barriersReducer({
            type: GameController.DELETE_BARRIERS,
            barriersArr: this.barriersArray
        })

        clearInterval(this.spawnInterval)
        this.spawnInterval = null

        gsap.to(this.character.position, {
            duration: 2,
            x: GameController.DS.width * 0.3,
            y: GameController.DS.height * 0.5,
        })
        gsap.to(this.character, {
            duration: 2,
            rotation: 0,
            onComplete: () => this.createStartButton()
        })
    }

    async createBarriers() {
        const spawnBarriers = async () => {
            const barrierTexture = await Assets.load(barrierImage)

            const shiftMultiple = Math.random() * 50 + 100
            const betweenMultiple = Math.random() * 50 + 150

            const whoShift = Math.random() < 0.5 ? 'top' : 'bottom'

            const barrierTop = new Barrier(barrierTexture, {
                direction: 'top',
                shift: whoShift === 'top' ? -shiftMultiple : shiftMultiple,
                between: whoShift === 'top' ? 0 : -betweenMultiple
            })
            const barrierBottom = new Barrier(barrierTexture, {
                direction: 'bottom',
                shift: whoShift === 'top' ? shiftMultiple : -shiftMultiple,
                between: whoShift === 'top' ? betweenMultiple : 0
            })

	        const scoreLine = new ScoreLine(
				Texture.EMPTY,
		        this.character,
		        barrierBottom.x
	        )
	        scoreLine.scoreLineMove()
	        this.scoreLinesArray.push(scoreLine)

            this.barriersReducer({
	            type: GameController.CREATE_BARRIERS,
	            barriersArr: [barrierTop, barrierBottom]
			})
        }

        this.spawnInterval = setInterval(spawnBarriers, 3000)
    }

	barriersReducer({ type, barriersArr }) {
        const barrierLogic = {
            [GameController.CREATE_BARRIERS]: () =>
                barriersArr.forEach(barrier => {
                    this.app.stage.addChild(barrier)

                    this.barriersArray.push(barrier)

                    barrier.barrierMove()
                }),
            [GameController.DELETE_BARRIERS]: () =>
                this.barriersArray = this.barriersArray.filter(barrier => {
                    if (!barriersArr.includes(barrier)) return true

                    barrier.barrierRemove()
                    barrier.destroy()

                    return false
                })
        }
        barrierLogic[type]()
    }

	scoreReducer({ type, scoreLine }) {
		const scoreLogic = {
			[GameController.ADD_POINT]: () => {
				this.score.text = +this.score.text + 1

				scoreLine.scoreLineRemove()
				scoreLine.destroy()

				this.scoreLinesArray = this.scoreLinesArray.filter(prevScoreLine => prevScoreLine !== scoreLine)
			},
			[GameController.DELETE_SCORE]: () => {
				this.scoreLinesArray = this.scoreLinesArray.filter(scoreLine => {
					scoreLine.scoreLineRemove()
					scoreLine.destroy()
					return false
				})

				this.score.destroy()
				this.score = null
			}
		}
		scoreLogic[type]()
	}

	createScore() {
		const score = new Score('0', {
			fontFamily: 'Arial',
			fontSize: 80,
			fill: 0xffffff
		})
		this.app.stage.addChild(this.score = score)
	}

    async createBackground() {
        const backgroundTexture = await Assets.load(backgroundImage)
        const background = new Background(backgroundTexture)

        this.app.stage.mask = new Graphics().rect(
            0, 0,
            background.width,
            background.height)
        .endFill()

        this.app.stage.addChild(background)
    }

    async createCharacter() {
        const characterTexture = await Assets.load(characterImage)
        const character = new Character(characterTexture)
        this.app.stage.addChild(this.character = character)
    }

    async createStartButton() {
        const startTexture = await Assets.load(startImage)
        const start = new StartBtn(startTexture)
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

    gameListen() {
        window.addEventListener('resize', this.resizeToWindow)

        GameController.GAME_EMITTER.on(GameController.START_GAME, this.startGame)
        GameController.GAME_EMITTER.on(GameController.RESTART_GAME, this.restartGame)
        GameController.GAME_EMITTER.on(GameController.DISPATCH_BARRIERS, this.barriersReducer)
        GameController.GAME_EMITTER.on(GameController.ADD_POINT, this.scoreReducer)
    }
}