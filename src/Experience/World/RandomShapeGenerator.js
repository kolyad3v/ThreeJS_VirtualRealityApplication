import {
	DodecahedronGeometry,
	Mesh,
	MeshBasicMaterial,
	MeshNormalMaterial,
	OctahedronGeometry,
	TetrahedronGeometry,
	TorusGeometry,
	TorusKnotGeometry,
} from 'three'
import Experience from '../Experience'

export default class RandomShapeGenerator {
	constructor(name, numberOfShapes) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.time = this.experience.time
		this.name = name

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder(this.name).close()
		}

		switch (this.name) {
			case 'TorusKnot':
				this.material = new MeshNormalMaterial()
				this.geometry = new TorusKnotGeometry(2, 1, 70, 20)
				this.geometry.scale(0.1, 0.1, 0.1)
				for (let i = 0; i < numberOfShapes; i++) {
					this.setShapes()
				}
				break
			case 'Torus':
				this.material = new MeshNormalMaterial()
				this.geometry = new TorusGeometry(1, 0.4, 20, 20)
				this.geometry.scale(0.5, 0.5, 0.5)
				for (let i = 0; i < numberOfShapes; i++) {
					this.setShapes()
				}
				break

			case 'Dodecahedron':
				this.material = new MeshNormalMaterial({ wireframe: true })
				this.geometry = new DodecahedronGeometry(1, 0)
				this.geometry.scale(0.5, 0.5, 0.5)
				for (let i = 0; i < numberOfShapes; i++) {
					this.setShapes()
				}
				break
			case 'Octahedron':
				this.material = new MeshNormalMaterial({ wireframe: true })
				this.geometry = new OctahedronGeometry(1, 0)
				this.geometry.scale(0.5, 0.5, 0.5)
				for (let i = 0; i < numberOfShapes; i++) {
					this.setShapes()
				}
				break
			case 'Tetrahedron':
				this.material = new MeshNormalMaterial({ wireframe: true })
				this.geometry = new TetrahedronGeometry(1, 0)
				this.geometry.scale(0.5, 0.5, 0.5)
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
		let randomX = (Math.random() - 0.5) * 20
		let randomY = (Math.random() - 0.5) * 10
		let randomZ = -Math.random() * 50
		this.mesh = new Mesh(this.geometry, this.material)
		this.mesh.position.z = randomZ
		this.mesh.position.y = randomY
		this.mesh.position.x = randomX
		this.mesh.rotation.set(randomX, randomY, randomZ)

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
				.min(-10)
				.max(10)
				.step(0.1)
				.name('z pos')
		}
	}

	update() {
		this.mesh.rotation.z = this.time.elapsed / 2000
		this.mesh.rotation.y = this.time.elapsed / 2000
	}
}
