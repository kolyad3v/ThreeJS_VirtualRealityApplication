import * as THREE from 'three'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'
import gsap from 'gsap'

export default class Raycaster extends EventEmitter {
	constructor() {
		super()

		this.experience = new Experience()
		this.camera = this.experience.camera.instance
		this.controls = this.experience.camera.controls
		this.world = this.experience.world
		this.renderer = this.experience.renderer.instance

		this.objectsToTestArray = [this.experience.world.vrGoggles.model]

		// for use with mouse targeting
		this.sizes = this.experience.sizes
		this.mouse = new THREE.Vector2()

		// interactions
		this.webglStyle = document.querySelector('.webgl').style

		this.vrGogglesHovered = false
		this.grabOpen = true

		// create Raycaster
		this.createRaycaster()

		// this.smoothToGoggles = () => {
		// 	console.log('goggles hovered')
		// 	this.vrGogglesHovered = true
		// }
	}

	createRaycaster() {
		this.raycaster = new THREE.Raycaster()

		// for use with mouse targeting
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
		})

		// interactions
		// do the same for other objects when ready -->

		document.querySelector('.webgl').addEventListener('mousedown', () => {
			this.grabOpen = false
			this.webglStyle.cursor = 'grabbing'
		})
		document.querySelector('.webgl').addEventListener('mouseup', () => {
			this.grabOpen = true
		})

		document.querySelector('.webgl').addEventListener('dblclick', () => {
			this.vrGogglesHovered &&
				setTimeout(async () => {
					gsap.to(this.controls.object.position, {
						duration: 4,
						ease: 'power2.inOut',
						x: 0.015354003026610627,
						y: 0.02299479124845972,
						z: 0.44695427287115613,
					})
					setTimeout(() => {
						this.world.generateContent()
						this.renderer.setClearColor('#000000')
						gsap.to(this.controls.target, {
							duration: 20,
							ease: 'power2.inOut',
							z: -4000,
						})
						gsap.to(this.controls.object.position, {
							duration: 20,
							ease: 'power2.inOut',
							z: -3990,
						})
					}, 5000)
				}, 1000)
		})
	}

	// showNotice(board) {
	// 	switch (board) {
	// 		case 'headset':
	// 			if (this.vrGogglesHovered) {
	// 				this.vrGogglesHovered = false
	// 				this.smoothToGoggles()
	// 			}
	// 			break

	// 		default:
	// 			break
	// 	}
	// }

	update() {
		this.raycaster.setFromCamera(this.mouse, this.camera)
		this.intersectObjects = this.raycaster.intersectObjects(
			this.objectsToTestArray
		)

		// console.log(this.intersectObjects)
		if (this.intersectObjects.length > 0) {
			this.objectHit = this.intersectObjects[0].object
			switch (this.objectHit.name) {
				case 'headset':
					this.webglStyle.cursor = 'pointer'
					this.vrGogglesHovered = true
					break
				default:
					break
			}
		} else {
			this.vrGogglesHovered = false
			this.grabOpen && (this.webglStyle.cursor = 'grab')
		}
	}
}
