'use client'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import Loader from '@/components/loader/Loader'
import * as CubeMesh from '@/cube/Cube'

gsap.ticker.fps(60)

const Cube = () => {
	const area = useRef()
	const reviveButton = useRef()
	const lullButton = useRef()

	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		(async () => {
			const { Scene, PerspectiveCamera, WebGLRenderer } = await import('three')
			const width = area.current.offsetWidth
			const height = area.current.offsetHeight
			const scene = new Scene()
			const camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
			camera.position.z = 5

			const { default: CubeController } = await import('@/cube/CubeController')
			const cube = new CubeMesh.Cube(1, 1, 1, true, 'coral')
			new CubeController(cube, reviveButton.current, lullButton.current)
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