'use client'
import { useEffect, useRef, useState } from 'react'
import { Application } from 'pixi.js'
import Loader from '@/components/loader/Loader'

const Game = () => {
	const [isLoading, setLoading] = useState(true)

	const gameContainerRef = useRef()

	useEffect(() => {
		const startGame = async () => {
			const { Application } = await import('pixi.js')
			const { default: GameController } = await import('@/game/GameController')

			setLoading(false)

			const controller = new GameController(new Application(), gameContainerRef.current)
			controller.activateGame()
		}
		startGame()
	}, [])

	return (
		<section className={ 'game page' }>
			<div className={ 'game__container' } ref={ gameContainerRef }></div>
			{ isLoading && <Loader /> }
		</section>
	)
}

export default Game