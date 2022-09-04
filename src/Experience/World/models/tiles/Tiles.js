import { MeshBasicMaterial, sRGBEncoding } from 'three'
import Experience from '../../../Experience'

export default class Tile {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.tiles
		this.debug = this.experience.debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('Tiles').close()
		}
		// this.frameTexture = this.resources.items.bakedFrames
		// this.frameTexture.flipY = false
		// this.frameTexture.encoding = sRGBEncoding
		// this.materialFrame = new MeshBasicMaterial({
		// 	map: this.frameTexture,
		// })

		this.setModel()
		this.setDebug()
	}

	setModel() {
		this.model = this.resource.scene
		// this.model.traverse((c) => {
		// 	c.material = this.materialFrame
		// })
		this.model.rotation.y = Math.PI
		this.model.position.set(1, 0, -4000)

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
