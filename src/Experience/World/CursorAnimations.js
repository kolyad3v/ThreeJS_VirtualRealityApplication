import * as THREE from 'three'
import Experience from '../Experience'

export default class CursorAnimations {
	constructor() {
		this.experience = new Experience()

		this.camera = this.experience.camera.instance
		this.controls = this.experience.camera.controls
		this.time = this.experience.time

		// For use with mouse targeting
		this.sizes = this.experience.sizes
		this.mouse = new THREE.Vector2()

		// Camera Animation

		// Instantiate Cursor Watcher
		this.cursorWatch()

		// this.activateParralax = false
		// this.setControls = () => {
		// 	this.controls.maxAzimuthAngle = 3
		// 	this.controls.minAzimuthAngle = 12
		// }
	}

	cursorWatch() {
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
		})
	}
	update() {
		// if (this.activateParralax) {
		// 	this.setControls()
		// 	this.parallaxX = this.mouse.x * 2
		// 	this.camera.position.x += this.parallaxX * -0.1
		// 	this.camera.position.z += this.parallaxX * -0.1
		// }
	}
}
