import Experience from '../Experience.js'
import Environment from './Environment.js'
import Box from './Box'
import ParticleGenerator from './ParticleGenerator.js'
import RandomShapeGenerator from './RandomShapeGenerator.js'
import Text from './Text.js'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.count = 0
		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.box = new Box()
			this.environment = new Environment()
		})
		this.particles = new ParticleGenerator()
		this.torusKnots = new RandomShapeGenerator('TorusKnot', 1)
		this.dodecahedrons = new RandomShapeGenerator('Dodecahedron', 1)
		this.torus = new RandomShapeGenerator('Torus', 1)
		this.ethShape = new RandomShapeGenerator('Octahedron', 1)
		this.triangle = new RandomShapeGenerator('Tetrahedron', 1, 0.5, 0.5, 0.5)
		this.nick = new Text('Nick', { x: -2, y: 0, z: -4000 }, 0)
		this.sam = new Text('Sam', { x: 2, y: 0, z: -4000 }, 0)
	}

	update() {
		if (this.particles) this.particles.update()

		if (this.torus) {
			this.torus.updateY()
		}
		if (this.triangle) {
			this.triangle.updateY()
			this.triangle.update()
		}
	}
}
