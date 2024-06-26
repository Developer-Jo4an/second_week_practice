'use client'
import { useEffect, useRef } from 'react'

const Page = () => {
    const canvas = useRef()
    const bottomCanvas = useRef()

    useEffect(() => {
        const context = canvas.current.getContext('2d')
        context.beginPath()
        context.fillStyle = 'transparent'
        context.fillRect(0, 0, 800, 800)
        context.closePath()

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
        context.setLineDash([0, 0])
        const createSquare = (x, y, r, w, h) => {
            context.beginPath()

            context.moveTo(x + r, y)
            context.lineTo(x + w - r, y)
            context.arc(x + w - r, y + r, r, -Math.PI / 2, 0)
            context.lineTo(x + w, y + h - r)
            context.arc(x + w - r, y + h - r, r,0, Math.PI / 2)
            context.lineTo(x + r, y + h)
            context.arc(x + r, y + h - r, r, Math.PI/ 2 , Math.PI)
            context.lineTo(x, y + r)
            context.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

            context.stroke()
            context.closePath()
        }
        createSquare(250, 20, 120, 300, 400)

        context.beginPath()
        context.font = '75px mono'
        context.fillStyle = 'red'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText('Hello world', 400, 600)
        context.fillStyle = 'blue'
        context.lineWidth = 2
        context.strokeText('Hello world', 400, 700)
        context.closePath()

        const ctx = bottomCanvas.current.getContext('2d')
        ctx.beginPath()
        ctx.fillStyle = 'transparent'
        ctx.fillRect(0, 0, 800, 800)
        ctx.closePath()

        ctx.beginPath()
        ctx.strokeStyle = 'red'
        ctx.moveTo(100, 100)
        ctx.lineTo(700, 100)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.font = '30px mono'
        const measureTop = ctx.measureText('Top')
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.fillText('Top', 100, 100)
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = 'blue'
        ctx.font = '30px mono'
        const measureBottom = ctx.measureText('Bottom')
        ctx.textAlign = 'left'
        ctx.textBaseline = 'bottom'
        ctx.fillText('Bottom', 100 + measureTop.width + 20, 100)
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = 'yellow'
        ctx.font = '30px mono'
        const measureMiddle = ctx.measureText('Middle')
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText('Middle', 100 + measureTop.width + measureBottom.width + 40, 100)
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = 'coral'
        ctx.font = '30px mono'
        const measureAlpha = ctx.measureText('Alphabetic')
        ctx.textAlign = 'left'
        ctx.textBaseline = 'alphabetic'
        ctx.fillText('Alphabetic', 100 + measureMiddle.width + measureTop.width + measureBottom.width + 60, 100)
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = 'coral'
        ctx.font = '30px mono'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'hanging'
        ctx.fillText('Hanging', 100 + measureMiddle.width + measureTop.width + measureBottom.width + measureAlpha.width + 80, 100)
        ctx.closePath()

        // const createImage = src =>
        //     new Promise(resolve => {
        //         const image = new Image()
        //         image.src = src
        //         image.onload = () => resolve(image)
        //     })
        //
        //
        // const getImage = async () => {
        //     const image = await createImage('/assets/image.jpg')
        //     ctx.drawImage(image, 0, 200, 300, 500)
        // }; getImage()
        let angle = 0

        requestAnimationFrame(animation)

        function animation () {
            requestAnimationFrame(animation)
            angle += Math.PI * 0.01

            ctx.clearRect(0, 0, 800, 800)

            ctx.beginPath()
            ctx.arc(
                800 / 2 + 100 * Math.cos(angle),
                800 / 2 + 100 * Math.sin(angle),
                5,
                0,
                Math.PI * 2
            )
            ctx.fillStyle = 'red'
            ctx.fill()
        }

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
                <canvas
                    className={ 'bezier__canvas' }
                    width={ 800 }
                    height={ 800 }
                    ref={ bottomCanvas }
                >
                    Ваш браузер не поддерживает canvas
                </canvas>
            </div>
        </section>
    )
}

export default Page