'use client'
import { useEffect, useRef } from 'react'
import { CubeMesh } from '@/cube/CubeMesh'
import { gsap } from 'gsap'
gsap.ticker.fps(60)

const Cube = () => {
    const area = useRef()

    useEffect(() => {
        (async () => {
            const {
                Scene,
                PerspectiveCamera,
                WebGLRenderer,
                Group
            } = await import('three')

            const gameArea = area.current
            const width = area.current.offsetWidth
            const height = area.current.offsetHeight

            const camera = new PerspectiveCamera(90, width / height, 0.1, 1000)
            camera.position.z = 3
            const scene = new Scene()

            const group = new Group()

            const cube = new CubeMesh(1, 1, 1, 'pink')
            const cube2 = new CubeMesh(0.5, 0.5, 0.5, 'red')
            const cube3 = new CubeMesh(1.5, 1.5, 1.5, 'blue')

            group.add(cube)
            group.add(cube2)
            group.add(cube3)
            scene.add(group)

            const rendered = new WebGLRenderer()
            rendered.setSize(width, height)
            rendered.setAnimationLoop(animation)
            gameArea.append(rendered.domElement)

            let angle = 0

            function animation() {
                angle += 0.01

                group.position.set(
                    2 * Math.cos(angle),
                    2 * Math.sin(angle),
                    cube.position.z
                )

                rendered.render(scene, camera)
            }

            gsap.ticker.add(animation)
        })()
    }, [])

    return (
        <section className={ 'cube page' }>
            <div className={ 'cube__area' } ref={ area }></div>
        </section>
    )
}

export default Cube