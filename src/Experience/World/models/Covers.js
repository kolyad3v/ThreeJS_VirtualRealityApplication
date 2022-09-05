import Experience from '../../Experience'

export default class Covers {
	constructor(samOrNick, position) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.tiles
		this.debug = this.experience.debug

		this.x = position.x
		this.y = position.y

		samOrNick === 1 && (this.resource = this.resources.items.nickCover)
		samOrNick === 2 && (this.resource = this.resources.items.samCover)

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder(samOrNick).close()
		}

		this.setModel()
		this.setDebug()
	}

	setModel() {
		this.model = this.resource.scene
		// this.model.traverse((c) => {
		// 	c.material = this.materialFrame
		// })
		this.model.position.set(1, 0, -4000)
		this.model.position.set(this.x, this.y, -4000)
		this.model.scale.x = 2
		this.model.scale.y = 2
		this.model.scale.z = 2

		this.scene.add(this.model)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.add(this.model.rotation, 'y').min(-5).max(5).step(0.1)
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
