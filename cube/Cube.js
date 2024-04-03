import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

export class Cube extends Mesh {
	constructor(x, y, z, wireframe, color) {
		const geo = new BoxGeometry(x, y, z)
		const material = new MeshBasicMaterial({ color, wireframe })
		super(geo, material)
	}
}
