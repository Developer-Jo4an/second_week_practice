export const MOVE_FORWARD = 'FORWARD'
export const MOVE_BACK = 'BACK'
export const MOVE_LEFT = 'LEFT'
export const MOVE_RIGHT = 'RIGHT'
export const MOVE_UP = 'UP'
export const MOVE_DOWN = 'DOWN'

export const defaultCubeControl = {
    forward: { name: MOVE_FORWARD, keys: [87], isActive: false },
    back: { name: MOVE_BACK, keys: [83], isActive: false },
    left: { name: MOVE_LEFT, keys: [65], isActive: false },
    right: { name: MOVE_RIGHT, keys: [68], isActive: false },
    up: { name: MOVE_UP, keys: [32], isActive: false },
    down: { name: MOVE_DOWN, keys: [16], buttons: [], isActive: false }
}