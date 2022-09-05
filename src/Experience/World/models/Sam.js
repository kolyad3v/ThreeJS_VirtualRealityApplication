import { Vector3 } from 'three'
import Experience from '../../Experience'

export default class Model {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.sam
		this.resourceClick = this.resources.items.clickFlip
		this.debug = this.experience.debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('sam').close()
		}

		// this.material = new MeshBasicMaterial({})

		this.setModel()
		this.setModelClick()
		this.setDebug()
	}

	setModel() {
		this.model = this.resource.scene
		this.model.rotation.y = 6.2
		this.model.position.set(1.9, 4.7, -4000)
		this.scene.add(this.model)
	}

	setModelClick() {
		this.modelClick = this.resourceClick.scene
		this.modelClick.rotation.y = 6.2
		this.modelClick.scale.x = 0.25
		this.modelClick.scale.y = 0.25
		this.modelClick.scale.z = 0.25
		this.modelClick.position.set(4, 0.6, -3999)

		this.scene.add(this.modelClick)
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
			this.debugFolder
				.add(this.modelClick.rotation, 'y')
				.min(-10)
				.max(10)
				.step(0.1)
			this.debugFolder
				.add(this.modelClick.position, 'x')
				.min(-10)
				.max(10)
				.step(0.1)
			this.debugFolder
				.add(this.modelClick.position, 'y')
				.min(-10)
				.max(10)
				.step(0.1)
			this.debugFolder
				.add(this.modelClick.position, 'z')
				.min(-4030)
				.max(-3990)
				.step(0.1)
		}
	}
}
