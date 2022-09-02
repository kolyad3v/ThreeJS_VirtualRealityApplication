import Experience from '../Experience.js'
import Environment from './Environment.js'
import Box from './Box'
import ParticleGenerator from './ParticleGenerator.js'
import RandomShapeGenerator from './RandomShapeGenerator.js'

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
		this.torusKnots = new RandomShapeGenerator('TorusKnot', 20)
		this.dodecahedrons = new RandomShapeGenerator('Dodecahedron', 20)
		this.torus = new RandomShapeGenerator('Torus', 20)
		this.ethShape = new RandomShapeGenerator('Octahedron', 20)
		this.triangle = new RandomShapeGenerator('Tetrahedron', 20)
	}

	update() {
		if (this.fox) this.fox.update()
		if (this.particles) {
			this.particles.update()
		}
	}
}
