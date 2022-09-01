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

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.box = new Box()
			this.environment = new Environment()
		})
		this.particles = new ParticleGenerator()
		this.randomShape = new RandomShapeGenerator()
	}

	update() {
		if (this.fox) this.fox.update()
		if (this.particles) {
			this.particles.update()
		}
	}
}
