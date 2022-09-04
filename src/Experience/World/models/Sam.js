import { Vector3 } from 'three'
import Experience from '../../Experience'

export default class Model {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.sam
		this.debug = this.experience.debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('sam').close()
		}

		// this.material = new MeshBasicMaterial({})

		this.setModel()
		this.setDebug()
	}

	setModel() {
		this.model = this.resource.scene

		this.model.rotation.y = 7
		this.model.children.scale = new Vector3(0.5, 0.5, 0.5)
		this.model.position.set(-6.5, 5.3, -4000)

		this.scene.add(this.model)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.add(this.model.rotation, 'y').min(-10).max(10).step(0.1)
			this.debugFolder.add(this.model.position, 'x').min(-10).max(10).step(0.1)
			this.debugFolder.add(this.model.position, 'y').min(-10).max(10).step(0.1)
			this.debugFolder
				.add(this.model.position, 'z')
				.min(-4030)
				.max(-3990)
				.step(0.1)
		}
	}
}
