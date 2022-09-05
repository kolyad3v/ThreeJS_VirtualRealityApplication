import { Vector3 } from 'three'
import Experience from '../../Experience'

export default class Model {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.nick
		this.resourceClick = this.resources.items.viewPortfolio
		this.resourceArrow = this.resources.items.arrow
		this.debug = this.experience.debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('nick').close()
		}

		// this.material = new MeshBasicMaterial({})

		this.setModel()
		this.setModelClick()
		this.setModelArrow()
		this.setDebug()
	}

	setModel() {
		this.model = this.resource.scene
		this.model.rotation.y = 6.4
		this.model.position.set(-6.8, 6.3, -3999.3)
		this.model.name = 'nickName'
		this.scene.add(this.model)
	}

	setModelClick() {
		this.modelClick = this.resourceClick.scene
		this.modelClick.rotation.y = 6.4
		this.modelClick.scale.x = 0.25
		this.modelClick.scale.y = 0.25
		this.modelClick.scale.z = 0.25
		this.modelClick.position.set(-4.2, 6.6, -3999.3)

		this.scene.add(this.modelClick)
	}

	setModelArrow() {
		this.modelArrow = this.resourceArrow.scene
		this.modelArrow.rotation.y = 4.9
		this.modelArrow.rotation.x = 3.4
		this.modelArrow.scale.x = 0.25
		this.modelArrow.scale.y = 0.25
		this.modelArrow.scale.z = 0.25
		this.modelArrow.position.set(-4.3, 5, -3999.3)

		this.scene.add(this.modelArrow)
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
				.name('viewPortfolio')
			this.debugFolder
				.add(this.modelClick.position, 'x')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('viewPortfolio')
			this.debugFolder
				.add(this.modelClick.position, 'y')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('viewPortfolio')
			this.debugFolder
				.add(this.modelClick.position, 'z')
				.min(-4030)
				.max(-3990)
				.step(0.1)
				.name('viewPortfolio')
			this.debugFolder
				.add(this.modelArrow.rotation, 'y')
				.min(-10)
				.max(10)
				.step(0.1)
			this.debugFolder
				.add(this.modelArrow.rotation, 'x')
				.min(-10)
				.max(10)
				.step(0.1)
			this.debugFolder
				.add(this.modelArrow.position, 'x')
				.min(-10)
				.max(10)
				.step(0.1)
			this.debugFolder
				.add(this.modelArrow.position, 'y')
				.min(-10)
				.max(10)
				.step(0.1)
			this.debugFolder
				.add(this.modelArrow.position, 'z')
				.min(-4030)
				.max(-3990)
				.step(0.1)
		}
	}
}
