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
		this.tile1ToFlip = this.world.tiles.model.children.find(
			(el) => el.name === '1'
		)
		this.tile2ToFlip = this.world.tiles.model.children.find(
			(el) => el.name === '2'
		)
		this.tile3ToFlip = this.world.tiles.model.children.find(
			(el) => el.name === '3'
		)
		this.tile4ToFlip = this.world.tiles.model.children.find(
			(el) => el.name === '4'
		)
		this.tile5ToFlip = this.world.tiles.model.children.find(
			(el) => el.name === '5'
		)
		this.tile6ToFlip = this.world.tiles.model.children.find(
			(el) => el.name === '6'
		)
		this.tile7ToFlip = this.world.tiles.model.children.find(
			(el) => el.name === '7'
		)
		this.tile8ToFlip = this.world.tiles.model.children.find(
			(el) => el.name === '8'
		)
		this.tile9ToFlip = this.world.tiles.model.children.find(
			(el) => el.name === '9'
		)

		this.objectsToTestArray = [
			this.experience.world.vrGoggles.model,
			this.experience.world.tiles.model,
		]

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
		document.querySelector('.webgl').addEventListener('click', () => {
			this.tile1 &&
				gsap.to(this.tile1ToFlip.rotation, {
					duration: 2,
					ease: 'back.inOut(1.4)',
					y: '+=3.141592653589793',
				})
			this.tile2 &&
				gsap.to(this.tile2ToFlip.rotation, {
					duration: 2,
					ease: 'back.inOut(1.4)',
					y: '+=3.141592653589793',
				})
			this.tile3 &&
				gsap.to(this.tile3ToFlip.rotation, {
					duration: 2,
					ease: 'back.inOut(1.4)',
					y: '+=3.141592653589793',
				})
			this.tile4 &&
				gsap.to(this.tile4ToFlip.rotation, {
					duration: 2,
					ease: 'back.inOut(1.4)',
					y: '+=3.141592653589793',
				})
			this.tile5 &&
				gsap.to(this.tile5ToFlip.rotation, {
					duration: 2,
					ease: 'back.inOut(1.4)',
					y: '+=3.141592653589793',
				})
			this.tile6 &&
				gsap.to(this.tile6ToFlip.rotation, {
					duration: 2,
					ease: 'back.inOut(1.4)',
					y: '+=3.141592653589793',
				})
			this.tile7 &&
				gsap.to(this.tile7ToFlip.rotation, {
					duration: 2,
					ease: 'back.inOut(1.4)',
					y: '+=3.141592653589793',
				})
			this.tile8 &&
				gsap.to(this.tile8ToFlip.rotation, {
					duration: 2,
					ease: 'back.inOut(1.4)',
					y: '+=3.141592653589793',
				})
			this.tile9 &&
				gsap.to(this.tile9ToFlip.rotation, {
					duration: 2,
					ease: 'back.inOut(1.4)',
					y: '+=3.141592653589793',
				})
		})
		document.querySelector('.webgl').addEventListener('dblclick', () => {
			this.vrGogglesHovered &&
				setTimeout(async () => {
					gsap.to(this.controls.object.position, {
						duration: 4,
						ease: 'back.inOut(1.4)',
						x: 0.015354003026610627,
						y: 0.02299479124845972,
						z: 0.44695427287115613,
					})
					setTimeout(() => {
						this.world.generateContent()
						this.renderer.setClearColor('#000000')

						gsap.to(this.controls.target, {
							duration: 20,
							ease: CustomEase.create(
								'custom',
								'M0,0 C0.25,0 0.294,0.023 0.335,0.05 0.428,0.11 0.772,0.244 0.804,0.454 0.827,0.613 0.79,0.795 0.854,0.904 0.881,0.95 0.908,1 1,1 '
							),
							z: -4000,
						})
						gsap.to(this.controls.object.position, {
							duration: 20,
							ease: CustomEase.create(
								'custom',
								'M0,0 C0.25,0 0.294,0.023 0.335,0.05 0.428,0.11 0.772,0.244 0.804,0.454 0.827,0.613 0.79,0.795 0.854,0.904 0.881,0.95 0.908,1 1,1 '
							),
							z: -3990,
						})
					}, 5000)
				}, 250)
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
			console.log(this.objectHit.parent.name)
			switch (this.objectHit.parent.name) {
				case 'Scene':
					this.webglStyle.cursor = 'pointer'
					this.vrGogglesHovered = true
					break
				case '1':
					this.webglStyle.cursor = 'pointer'
					this.tile1 = true
					this.tile2 = false
					this.tile3 = false
					this.tile4 = false
					this.tile5 = false
					this.tile6 = false
					this.tile7 = false
					this.tile8 = false
					this.tile9 = false
					break
				case '2':
					this.webglStyle.cursor = 'pointer'
					this.tile2 = true
					this.tile1 = false
					this.tile3 = false
					this.tile4 = false
					this.tile5 = false
					this.tile6 = false
					this.tile7 = false
					this.tile8 = false
					this.tile9 = false
					break
				case '3':
					this.webglStyle.cursor = 'pointer'
					this.tile3 = true
					this.tile2 = false
					this.tile1 = false
					this.tile4 = false
					this.tile5 = false
					this.tile6 = false
					this.tile7 = false
					this.tile8 = false
					this.tile9 = false
					break
				case '4':
					this.webglStyle.cursor = 'pointer'
					this.tile4 = true
					this.tile2 = false
					this.tile3 = false
					this.tile1 = false
					this.tile5 = false
					this.tile6 = false
					this.tile7 = false
					this.tile8 = false
					this.tile9 = false
					break
				case '5':
					this.webglStyle.cursor = 'pointer'
					this.tile5 = true
					this.tile2 = false
					this.tile3 = false
					this.tile4 = false
					this.tile1 = false
					this.tile6 = false
					this.tile7 = false
					this.tile8 = false
					this.tile9 = false
					break
				case '6':
					this.webglStyle.cursor = 'pointer'
					this.tile6 = true
					this.tile2 = false
					this.tile3 = false
					this.tile4 = false
					this.tile5 = false
					this.tile1 = false
					this.tile7 = false
					this.tile8 = false
					this.tile9 = false
					break
				case '7':
					this.webglStyle.cursor = 'pointer'
					this.tile7 = true
					this.tile2 = false
					this.tile3 = false
					this.tile4 = false
					this.tile5 = false
					this.tile6 = false
					this.tile1 = false
					this.tile8 = false
					this.tile9 = false
					break
				case '8':
					this.webglStyle.cursor = 'pointer'
					this.tile8 = true
					this.tile2 = false
					this.tile3 = false
					this.tile4 = false
					this.tile5 = false
					this.tile6 = false
					this.tile7 = false
					this.tile1 = false
					this.tile9 = false
					break
				case '9':
					this.webglStyle.cursor = 'pointer'
					this.tile9 = true
					this.tile2 = false
					this.tile3 = false
					this.tile4 = false
					this.tile5 = false
					this.tile6 = false
					this.tile7 = false
					this.tile8 = false
					this.tile1 = false
					break
				default:
					break
			}
		} else {
			this.vrGogglesHovered = false
			this.tile1 = false
			this.tile2 = false
			this.tile3 = false
			this.tile4 = false
			this.tile5 = false
			this.tile6 = false
			this.tile7 = false
			this.tile8 = false
			this.tile9 = false

			this.grabOpen && (this.webglStyle.cursor = 'grab')
		}
	}
}
