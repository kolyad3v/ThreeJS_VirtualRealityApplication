import {
	DodecahedronGeometry,
	Mesh,
	MeshBasicMaterial,
	MeshNormalMaterial,
	OctahedronGeometry,
	ShaderMaterial,
	TetrahedronGeometry,
	TorusGeometry,
	TorusKnotGeometry,
} from 'three'
import * as THREE from 'three'
import VertexShader from './shaders/shapes/vertex.glsl'
import FragmentShader from './shaders/shapes/fragment.glsl'

import Experience from '../Experience'

export default class RandomShapeGenerator {
	constructor(name, numberOfShapes, R, G, B) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.time = this.experience.time
		this.name = name

		this.r = R
		this.g = G
		this.b = B

		this.xPostion = 0
		this.yPostion = 0

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder(this.name).close()
		}

		switch (this.name) {
			case 'TorusKnot':
				this.material = new MeshNormalMaterial()
				this.material.wireframe = true
				this.geometry = new TorusKnotGeometry(5, 1, 70, 20)
				// this.geometry.scale(0.5, 0.5, 0.5)
				this.zPostion = -3000

				for (let i = 0; i < numberOfShapes; i++) {
					this.setShapes()
				}

				break

			// TORUS DOUGHNUT HERE ---->>
			case 'Torus':
				this.material = new MeshNormalMaterial({})
				this.geometry = new TorusGeometry(10, 3, 30, 130)
				this.geometry.scale(0.5, 0.5, 0.5)
				this.zPostion = -2000
				for (let i = 0; i < numberOfShapes; i++) {
					this.setShapes()
				}
				break

			case 'Dodecahedron':
				this.material = new MeshNormalMaterial()
				this.material.wireframe = true

				this.geometry = new DodecahedronGeometry(3, 0)
				// this.geometry.scale(0.5, 0.5, 0.5)
				this.xPostion = 0
				this.yPostion = 0
				this.zPostion = -3500

				for (let i = 0; i < numberOfShapes; i++) {
					this.setShapes()
				}
				break
			case 'Octahedron':
				this.material = new MeshNormalMaterial()
				this.material.wireframe = true
				this.geometry = new OctahedronGeometry(3, 0)
				// this.geometry.scale(0.5, 0.5, 0.5)
				this.zPostion = -2500

				for (let i = 0; i < numberOfShapes; i++) {
					this.setShapes()
				}
				break
			case 'Tetrahedron':
				this.material = new ShaderMaterial({
					vertexShader: VertexShader,
					fragmentShader: FragmentShader,
					uniforms: {
						uTime: { value: 0 },
						uAlpha: { value: 0.84 },
						uRedVal: { value: this.r },
						uGreenVal: { value: this.g },
						uBlueVal: { value: this.b },
						uSpeedColorChange: { value: 0.0016 },
					},

					transparent: true,
					side: THREE.DoubleSide,
				})
				if (this.debug.active) {
					this.debugFolder
						.add(this.material.uniforms.uRedVal, 'value')
						.min(0)
						.max(1)
						.step(0.1)
						.name('uRedVal ')
					this.debugFolder
						.add(this.material.uniforms.uGreenVal, 'value')
						.min(0)
						.max(1)
						.step(0.1)
						.name('uGreenVal ')
					this.debugFolder
						.add(this.material.uniforms.uBlueVal, 'value')
						.min(0)
						.max(1)
						.step(0.1)
						.name('uBlueVal ')
					this.debugFolder
						.add(this.material.uniforms.uAlpha, 'value')
						.min(0)
						.max(1.0)
						.step(0.01)
						.name('uAlpha')
					this.debugFolder
						.add(this.material.uniforms.uSpeedColorChange, 'value')
						.min(0)
						.max(0.01)
						.step(0.0001)
						.name('color speed change')
				}
				this.geometry = new TetrahedronGeometry(6, 0)
				this.geometry.scale(0.5, 0.5, 0.5)
				this.zPostion = -2000

				for (let i = 0; i < numberOfShapes; i++) {
					this.setShapes()
				}
				break
			default:
				break
		}

		this.setDebug()
	}

	setShapes() {
		// let randomX = (Math.random() - 0.5) * 20
		// let randomY = (Math.random() - 0.5) * 10
		// let randomZ = -Math.random() * 50 - 30
		this.zPostion = this.zPostion / 3
		this.mesh = new Mesh(this.geometry, this.material)
		this.mesh.position.z = this.zPostion
		this.mesh.position.y = this.yPostion
		this.mesh.position.x = this.xPostion
		// this.mesh.rotation.set(randomX, randomY, randomZ)

		this.scene.add(this.mesh)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.mesh.rotation, 'x')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('x')
			this.debugFolder
				.add(this.mesh.rotation, 'y')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('y')
			this.debugFolder
				.add(this.mesh.rotation, 'z')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('z')

			this.debugFolder
				.add(this.mesh.position, 'x')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('x pos')
			this.debugFolder
				.add(this.mesh.position, 'y')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('y pos')
			this.debugFolder
				.add(this.mesh.position, 'z')
				.min(-150)
				.max(0)
				.step(1)
				.name('z pos')
			this.debugFolder
				.add(this.mesh.scale, 'x')
				.min(0)
				.max(10)
				.step(0.1)
				.name('x scale')
			this.debugFolder
				.add(this.mesh.scale, 'y')
				.min(0)
				.max(10)
				.step(0.1)
				.name('y scale')
			this.debugFolder
				.add(this.mesh.scale, 'z')
				.min(0)
				.max(10)
				.step(0.1)
				.name('z scale')
		}
	}

	updateX() {
		this.mesh.rotation.x = this.time.elapsed / 2000
	}
	updateY() {
		this.mesh.rotation.y = this.time.elapsed / 2000
	}
	updateZ() {
		this.mesh.rotation.z = this.time.elapsed / 2000
	}
	update() {
		this.material.uniforms.uTime.value = this.time.elapsed
	}
}
