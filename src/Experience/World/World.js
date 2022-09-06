import Experience from '../Experience.js'
import Environment from './Environment.js'
import ParticleGenerator from './ParticleGenerator.js'
import RandomShapeGenerator from './RandomShapeGenerator.js'
import Covers from './models/Covers.js'
import Model from './models/Model.js'
import Raycaster from '../Utils/Raycaster.js'
import DoubleClick from './models/DoubleClick.js'
import ClickDrag from './models/ClickDrag.js'
import Nick from './models/Nick.js'
import Sam from './models/Sam.js'
import Tiles from './models/tiles/Tiles.js'
import CursorAnimations from './CursorAnimations.js'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.controls = this.experience.camera.controls
		this.count = 0
		// Wait for resources
		this.generateReady = true

		this.resources.on('ready', () => {
			// Setup

			this.clickDrag = new ClickDrag()
			this.doubleClick = new DoubleClick()
			this.vrGoggles = new Model()
			this.tiles = new Tiles()
			this.nickCover = new Covers(1, { x: -4.5, y: -1.95 })
			this.samCover = new Covers(2, { x: -0.6, y: -1.95 })
			this.nick = new Nick()
			this.environment = new Environment()

			this.raycaster = new Raycaster()

			// this.cursorAnimations = new CursorAnimations()
		})
		this.generateContent = () => {
			if (this.generateReady) {
				this.generateReady = false
				this.particles = new ParticleGenerator()
				this.torusKnots = new RandomShapeGenerator('TorusKnot', 1)
				this.dodecahedrons = new RandomShapeGenerator('Dodecahedron', 1)
				this.torus = new RandomShapeGenerator('Torus', 1)
				this.ethShape = new RandomShapeGenerator('Octahedron', 1)

				this.sam = new Sam()

				this.controls.enableRotate = false
			}
		}
	}

	update() {
		// if (this.particles) this.particles.update()

		this.torus && this.torus.updateY()
		this.torusKnots && this.torusKnots.updateZ()
		this.ethShape && this.ethShape.updateZ()
		this.ethShape && this.ethShape.updateX()
		this.dodecahedrons && this.dodecahedrons.updateZ()

		this.cursorAnimations && this.cursorAnimations.update()

		if (this.raycaster) {
			this.raycaster.update()
		}
	}
}
