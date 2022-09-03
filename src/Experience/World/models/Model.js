import { MeshBasicMaterial, sRGBEncoding } from 'three'
import Experience from '../../Experience'

export default class Model {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.model
		this.debug = this.experience.debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('Model').close()
		}
		this.materialTexture = this.resources.items.baked
		this.materialTexture.flipY = false
		this.materialTexture.encoding = sRGBEncoding
		this.material = new MeshBasicMaterial({
			map: this.materialTexture,
		})

		this.setModel()
		this.setDebug()
	}

	setModel() {
		this.model = this.resource.scene
		this.model.traverse((c) => {
			c.material = this.material
		})
		this.model.rotation.y = Math.PI
		this.scene.add(this.model)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.add(this.model.rotation, 'y').min(-5).max(5).step(0.1)
		}
	}
}
