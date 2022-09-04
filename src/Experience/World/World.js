import Experience from '../Experience.js'
import Environment from './Environment.js'
import ParticleGenerator from './ParticleGenerator.js'
import RandomShapeGenerator from './RandomShapeGenerator.js'
import Text from './Text.js'
import Model from './models/Model.js'
import Raycaster from '../Utils/Raycaster.js'
import DoubleClick from './models/DoubleClick.js'
import ClickDrag from './models/ClickDrag.js'
import Nick from './models/Nick.js'
import Sam from './models/Sam.js'
import Tiles from './models/tiles/Tiles.js'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.count = 0
		// Wait for resources
		this.generateReady = true

		this.resources.on('ready', () => {
			// Setup
			// this.box = new Box()
			this.environment = new Environment()
			this.vrGoggles = new Model()
			this.tiles = new Tiles()
			this.raycaster = new Raycaster()
			this.clickDrag = new ClickDrag()
			this.doubleClick = new DoubleClick()
		})
		this.generateContent = () => {
			if (this.generateReady) {
				this.generateReady = false
				this.particles = new ParticleGenerator()
				this.torusKnots = new RandomShapeGenerator('TorusKnot', 1)
				this.dodecahedrons = new RandomShapeGenerator('Dodecahedron', 1)
				this.torus = new RandomShapeGenerator('Torus', 1)
				this.ethShape = new RandomShapeGenerator('Octahedron', 1)

				this.nick = new Nick()
				this.sam = new Sam()

				// this.nick = new Text('Nick', { x: -2, y: 0, z: -4000 }, 0)
				// this.sam = new Text('Sam', { x: 2, y: 0, z: -4000 }, 0)
			}
		}
	}

	update() {
		if (this.particles) this.particles.update()

		this.torus && this.torus.updateY()
		this.torusKnots && this.torusKnots.updateZ()
		this.ethShape && this.ethShape.updateZ()
		this.ethShape && this.ethShape.updateX()
		this.dodecahedrons && this.dodecahedrons.updateZ()

		if (this.raycaster) {
			this.raycaster.update()
		}
	}
}
