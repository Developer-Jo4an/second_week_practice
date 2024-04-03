export default class CubeController {
	activeKeys = []
	activeButtons = []
	activeActions = {
		forward: { name: 'forward', keys: [87], buttons: [4], isActive: false },
		back: { name: 'back', keys: [83], buttons: [3], isActive: false },
		left: { name: 'left', keys: [65], buttons: [0], isActive: false },
		right: { name: 'right', keys: [68], buttons: [2], isActive: false },
		up: { name: 'up', keys: [32], buttons: [1], isActive: false },
		down: { name: 'down', keys: [16], buttons: [], isActive: false }
	}

	constructor(cube, reviveButton, lullButton) {
		this.cubeMovement = this.cubeMovement.bind(this)
		this.reviveCube = this.reviveCube.bind(this)
		this.lullCube = this.lullCube.bind(this)
		this.cubeMotion = this.cubeMotion.bind(this)
		this.cubeStop = this.cubeStop.bind(this)

		this.cube = cube
		this.reviveButton = reviveButton
		this.lullButton = lullButton

		this.listenButtons()
	}

	cubeMotion(e) {
		const { mean, activeMeans, actionMeans } = {
			mean: e.type === 'keydown' ? e.keyCode : e.button,
			activeMeans: e.type === 'keydown' ? this.activeKeys : this.activeButtons,
			actionMeans: e.type === 'keydown' ? 'keys' : 'buttons'
		}

		const curAction = Object.values(this.activeActions).find(action => action[actionMeans].includes(mean))
		if (!curAction.isActive) {
			activeMeans.push(mean)
			curAction.isActive = true
			return
		}
		if (!activeMeans.includes(mean)) {
			activeMeans.push(mean)
		}
	}

	cubeStop(e) {
		const { mean, activeMeans, actionMeans } = {
			mean: e.type === 'keyup' ? e.keyCode : e.button,
			activeMeans: e.type === 'keyup' ? 'activeKeys' : 'activeButtons',
			actionMeans: e.type === 'keyup' ? 'keys' : 'buttons'
		}

		this[activeMeans] = this[activeMeans].filter(curMean => mean !== curMean)

		const curAction = Object.values(this.activeActions).find(action => action[actionMeans].includes(mean))

		const isActiveByKey = curAction.keys.reduce((acc, key) => this.activeKeys.includes(key) ? true : acc, false)
		const isActiveByButton = curAction.buttons
		.reduce((acc, button) => this.activeButtons.includes(button) ? true : acc, false)

		if (!isActiveByKey && !isActiveByButton) {
			curAction.isActive = false
		}
	}

	cubeMovement(e) {
		e.preventDefault()

		const cubeMovementLogic = {
			keydown: this.cubeMotion,
			pointerdown: this.cubeMotion,
			keyup: this.cubeStop,
			pointerup: this.cubeStop
		}
		cubeMovementLogic[e.type](e)
	}

	lullCube() {
		window.removeEventListener('pointerdown', this.cubeMovement)
		window.removeEventListener('pointerup', this.cubeMovement)
		window.removeEventListener('keydown', this.cubeMovement)
		window.removeEventListener('keyup', this.cubeMovement)
	}

	reviveCube() {
		window.addEventListener('pointerdown', this.cubeMovement)
		window.addEventListener('pointerup', this.cubeMovement)
		window.addEventListener('keydown', this.cubeMovement)
		window.addEventListener('keyup', this.cubeMovement)

		let self = this

		anim()

		function anim() {
			const arr = Object.values(self.activeActions).reduce((acc, action) => action.isActive ? [...acc, action.name] : acc, [])
			console.log(arr)
			requestAnimationFrame(anim)
		}
	}

	listenButtons() {
		this.reviveButton.addEventListener('click', this.reviveCube)
		this.lullButton.addEventListener('click', this.lullCube)
	}
}