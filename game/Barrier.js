import { Sprite } from 'pixi.js'
import { gsap } from 'gsap'
import GameController from '@/game/GameController'

export class Barrier extends Sprite {
    constructor(texture, { direction, shift, between }) {
        super(texture)
        this.moveAnimation = this.moveAnimation.bind(this)

        this.anchor.set(0.5)
        this.height = GameController.DS.height
        this.width = GameController.DS.height * 0.15
        this.rotation = direction === 'top' ? Math.PI : 0

        this.y = direction === 'top' ?
            shift + between
            :
            GameController.DS.height - shift + between

        this.x = GameController.DS.width + this.width * 0.5
    }

    isHidden() {
        return (
            this.x <= -this.width * 0.5
        )
    }

    moveAnimation() {
        if (!this) return

        if (this.isHidden()) {
            this.barrierRemove()
            GameController.GAME_EMITTER.emit(
                GameController.DISPATCH_BARRIERS,
                {
                    type: GameController.DELETE_BARRIERS,
                    barriersArr: [this]
                }
            )
        } else {
            this.position.set(this.x - 1.6, this.y)
        }
    }

    barrierMove() {
        gsap.ticker.add(this.moveAnimation)
    }

    barrierRemove() {
        gsap.ticker.remove(this.moveAnimation)
    }

}