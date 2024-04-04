import { gsap } from 'gsap'
import {
	defaultCubeControl,
	MOVE_BACK,
	MOVE_DOWN,
	MOVE_FORWARD,
	MOVE_LEFT,
	MOVE_RIGHT, MOVE_UP
} from '@/js/constants/cubeControl'
gsap.ticker.fps(60)

export default class CubeController {
	activeKeys = []

	constructor(cube, reviveButton, lullButton, actions = defaultCubeControl, speed = 0.05, limited = 3) {
		this.cubeMovementLogic = this.cubeMovementLogic.bind(this)
		this.reviveCube = this.reviveCube.bind(this)
		this.lullCube = this.lullCube.bind(this)
		this.cubeMotion = this.cubeMotion.bind(this)
		this.cubeStop = this.cubeStop.bind(this)
		this.cubeMove = this.cubeMove.bind(this)

		this.cube = cube
        this.actions = actions
		this.speed = speed
		this.limited = limited
		this.reviveButton = reviveButton
		this.lullButton = lullButton
	}

	cubeMove() {
		const moveLogic = {
			[MOVE_FORWARD] : () => this.cube.position.y += this.cube.position.y <= this.limited ? this.speed : 0,
			[MOVE_BACK] : () => this.cube.position.y -= this.cube.position.y >= -this.limited ? this.speed : 0,
			[MOVE_LEFT] : () => this.cube.position.x -= this.cube.position.x >= -this.limited ? this.speed : 0,
			[MOVE_RIGHT] : () => this.cube.position.x += this.cube.position.x <= this.limited ? this.speed : 0,
			[MOVE_UP] : () => this.cube.position.z += this.cube.position.z <= this.limited ? this.speed : 0,
			[MOVE_DOWN] : () => this.cube.position.z -= this.cube.position.z >= -this.limited ? this.speed : 0
		}
		this.getActiveActions().forEach(activeAction => moveLogic[activeAction]())
	}

	cubeMotion(e) {
		const { keyCode } = e
		const curAction = Object.values(this.actions).find(action => action.keys.includes(keyCode))
		if (!curAction.isActive) {
			this.activeKeys.push(keyCode)
			curAction.isActive = true
			this.getActiveActions()
			return
		}
		if (!this.activeKeys.includes(keyCode)) {
			this.activeKeys.push(keyCode)
		}
	}

	cubeStop(e) {
		const { keyCode } = e
		this.activeKeys = this.activeKeys.filter(key => key !== keyCode)

		const curAction = Object.values(this.actions).find(action => action.keys.includes(keyCode))

		const isActiveByKey = curAction.keys
		.reduce((acc, key) =>
			this.activeKeys.includes(key) ?
				true
				:
				acc
		,false)

		if (!isActiveByKey) curAction.isActive = false

		this.getActiveActions()
	}

	cubeMovementLogic(e) {
		e.preventDefault()

		const isAvailableKey = Object.values(this.actions)
		.reduce((acc, { keys }) => keys.includes(e.keyCode) ?
			true
			:
			acc
		,false)

		if (!isAvailableKey) return

		const cubeMovementLogic = {
			keydown: this.cubeMotion,
			keyup: this.cubeStop,
		}

		cubeMovementLogic[e.type](e)
	}

	lullCube() {
		window.removeEventListener('keydown', this.cubeMovementLogic)
		window.removeEventListener('keyup', this.cubeMovementLogic)
		gsap.ticker.remove(this.cubeMove)

	}

	reviveCube() {
		window.addEventListener('keydown', this.cubeMovementLogic)
		window.addEventListener('keyup', this.cubeMovementLogic)
		gsap.ticker.add(this.cubeMove)
	}

	listenButtons() {
		this.reviveButton.addEventListener('click', this.reviveCube)
		this.lullButton.addEventListener('click', this.lullCube)
	}

	getActiveActions() {
		return Object.values(this.actions)
		.reduce((acc, action) => action.isActive ?
			[...acc, action.name]
			:
			acc
		,[])
	}
}