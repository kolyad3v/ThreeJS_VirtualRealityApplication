import {
	Mesh,
	MeshBasicMaterial,
	MeshNormalMaterial,
	TorusGeometry,
	TorusKnotGeometry,
} from 'three'
import Experience from '../Experience'

export default class RandomShapeGenerator {
	constructor(name) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.name = name

		this.setShape()
	}

	setShape() {
		this.material = new MeshNormalMaterial()
		this.geometry = new TorusKnotGeometry(3, 1, 100, 50)
		this.geometry.scale(0.1, 0.1, 0.1)
		this.mesh = new Mesh(this.geometry, this.material)
		this.scene.add(this.mesh)
	}
}
