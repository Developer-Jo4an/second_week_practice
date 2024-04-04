'use client'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import Loader from '@/components/loader/Loader'
import * as CubeMesh from '@/cube/Cube'

gsap.ticker.fps(60)

const Cube = () => {
	const area = useRef()
	const reviveButton = useRef() // todo: Стоит ли делать так? Может лучше иначе?
	const lullButton = useRef()

	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		(async () => {
			const { Scene, PerspectiveCamera, WebGLRenderer } = await import('three')
			const { default: CubeController } = await import('@/cube/CubeController')

			const width = area.current.offsetWidth
			const height = area.current.offsetHeight
			const scene = new Scene()
			const camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
			camera.position.z = 5

			const cube = new CubeMesh.Cube(1, 1, 1, true, 'coral')
			const controller = new CubeController(cube, reviveButton.current, lullButton.current)
			controller.listenButtons()
			scene.add(cube)

			const renderer = new WebGLRenderer()
			renderer.setSize(width, height)
			renderer.setAnimationLoop(renderAnimation)
			area.current.append(renderer.domElement)

			function renderAnimation() {
				renderer.render(scene, camera)
			}

			setLoading(false)
		})()
	}, [])

	return (
		<section className={ 'cube page' }>
			<div className={ 'cube__buttons' }>
				<button
					className={ 'cube__button button' }
					ref={ reviveButton }
				>Revive Cube</button>
				<button
					className={ 'cube__button button' }
					ref={ lullButton }
				>Lull Cube</button>
			</div>
			<div className={ 'cube__area' } ref={ area }></div>
			{ isLoading && <Loader/> }
		</section>
	)
}

export default Cube