import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

export default class Box {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.camera = this.experience.camera.controls

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('Box Template').close()
			this.debugObject = {
				color: '#ffffff',
			}
		}
		console.log('box instantiated')

		this.material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })
		this.geometry = new THREE.BoxGeometry(2, 1, 1)

		this.setBox()
		this.setDebug()

		// Animations

		setTimeout(() => {
			// gsap.to(this.box.rotation, {
			// 	duration: 2,
			// 	ease: 'power2.inOut',
			// 	x: -0.4,
			// })
			gsap.to(this.camera.object.position, {
				duration: 4,
				ease: 'power2.inOut',
				x: 0.015354003026610627,
				y: 0.02299479124845972,
				z: 0.44695427287115613,
			})
			setTimeout(() => {
				gsap.to(this.camera.target, {
					duration: 10,
					ease: 'power2.inOut',
					z: -65,
				})

				gsap.to(this.camera.object.position, {
					duration: 10,
					ease: 'power2.inOut',
					z: -55,
				})
			}, 5000)
		}, 3000)
	}

	setBox() {
		this.box = new THREE.Mesh(this.geometry, this.material)
		this.scene.add(this.box)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.box.rotation, 'x')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('x')
			this.debugFolder
				.add(this.box.rotation, 'y')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('y')
			this.debugFolder
				.add(this.box.rotation, 'z')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('z')
			this.debugFolder
				.add(this.box.position, 'x')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('x')
			this.debugFolder
				.add(this.box.position, 'y')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('y')
			this.debugFolder
				.add(this.box.position, 'z')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('z')
		}
	}
}

// Final position of camera on zoom
// x
// :
// 0.015354003026610627
// y
// :
// 0.02299479124845972
// z
// :
// 0.44695427287115613
// final position we want the camera to look at and end up at.
// x
// :
// -4.640656446816674
// y
// :
// -8.120599976421829
// z
// :
// -62.66517693443177
