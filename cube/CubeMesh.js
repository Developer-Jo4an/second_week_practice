import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

export class CubeMesh extends Mesh {
    constructor(x, y, z, color) {
        const geometry = new BoxGeometry(x, y, z)
        const material = new MeshBasicMaterial({ color: color, wireframe: true })
        super(geometry, material)
    }
}