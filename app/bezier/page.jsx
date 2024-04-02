'use client'
import { useEffect, useRef } from 'react'

const Page = () => {
    const canvas = useRef()

    useEffect(() => {
        const context = canvas.current.getContext('2d')
        context.fillStyle = 'transparent'
        context.fillRect(0, 0, 800, 800)

        const createLine = ({ start, end }) => {
            context.beginPath()
            context.setLineDash([15, 15])
            context.moveTo(start.x, start.y) // 0, 400
            context.lineTo(end.x, end.y) // 800, 200
            context.strokeWidth = 10
            context.strokeStyle = 'red'
            context.stroke()
            context.closePath()
        }

        context.beginPath()
        context.moveTo(0, 800)
        context.quadraticCurveTo(400, 0, 800, 800)
        context.fillStyle = 'coral'
        context.fill()
        context.stroke()
        context.closePath()

        context.beginPath()
        context.moveTo(0, 400)
        context.bezierCurveTo(800, 200, 0, 200, 800, 0)
        context.strokeWidth = 10
        context.strokeStyle = 'black'
        context.stroke()
        context.closePath()

        createLine({
            start: { x: 0, y: 400 },
            end: { x: 800, y: 200 }
        })
        createLine({
            start: { x: 800, y: 200 },
            end: { x: 0, y: 200 }
        })
        createLine({
            start: { x: 0, y: 200 },
            end: { x: 800, y: 0 }
        })
    }, [])

    return (
        <section className={ 'bezier page' }>
            <div className={ 'bezier__canvas-container' }>
                <canvas
                    className={ 'bezier__canvas' }
                    width={ 800 }
                    height={ 800 }
                    ref={ canvas }
                >
                    Ваш браузер не поддерживает canvas
                </canvas>
            </div>
        </section>
    )
}

export default Page