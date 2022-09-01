import * as THREE from 'three'
import Experience from '../Experience'

import VertexShader from './shaders/stars/vertex.glsl'
import FragmentShader from './shaders/stars/fragment.glsl'

export default class ParticleGenerator {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.renderer = this.experience.renderer.instance
		this.time = this.experience.time
		this.debug = this.experience.debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('Particles')
		}

		this.particleParams = {
			color: '#fa00a3',
			size: 0.05,
			radius: 0.3,
		}
		this.particleParams.number = 5000

		this.particleGeometry = null
		this.particleMaterial = null
		this.particlePoints = null

		this.generateParticles()
		// this.setDebug()
	}

	generateParticles() {
		// Clear any previous instances of particles to save the cpu from annihilation
		if (this.particlePoints !== null) {
			console.log(this.particleGeometry)
			// this.particleGeometry.dispose()
			// this.particleMaterial.dispose()
			// this.scene.remove(this.particlePoints)
		}

		// Create holding arrays for data
		this.particleGeometry = new THREE.BufferGeometry()
		this.positions = new Float32Array(this.particleParams.number * 3)
		this.scales = new Float32Array(this.particleParams.number)
		this.colors = new Float32Array(this.particleParams.number * 3)
		this.color = new THREE.Color(this.particleParams.color)

		// Fill Holding arrays with data
		for (let i = 0; i < this.particleParams.number; i++) {
			this.i3 = i * 3

			this.positions[this.i3 + 0] = Math.random() - 0.5
			this.positions[this.i3 + 1] = Math.random() - 0.5
			this.positions[this.i3 + 2] = Math.random() - 0.5

			this.scales[i] = Math.random() * 5
			this.colors[this.i3] = this.color.r
			this.colors[this.i3 + 1] = this.color.g
			this.colors[this.i3 + 2] = this.color.b
		}

		this.particleGeometry.setAttribute(
			'position',
			new THREE.BufferAttribute(this.positions, 3)
		)
		this.particleGeometry.setAttribute(
			'color',
			new THREE.BufferAttribute(this.colors, 3)
		)
		this.particleGeometry.setAttribute(
			'aScale',
			new THREE.BufferAttribute(this.scales, 1)
		)

		// Create shader material for particles
		this.particleMaterial = new THREE.ShaderMaterial({
			vertexColors: true,
			blending: THREE.AdditiveBlending,
			vertexShader: VertexShader,
			fragmentShader: FragmentShader,
			depthWrite: false,
			uniforms: {
				uTime: { value: 0 },
				uSize: { value: 3 * this.renderer.getPixelRatio() },
			},
		})

		// this.particleMaterial = new THREE.PointsMaterial({
		// 	size: this.particleParams.size,
		// 	sizeAttenuation: true,
		// 	depthWrite: false,
		// 	blending: THREE.AdditiveBlending,
		// })

		this.particlePoints = new THREE.Points(
			this.particleGeometry,
			this.particleMaterial
		)
		console.log(this.particleGeometry)
		this.scene.add(this.particlePoints)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.particleParams, 'number')
				.min(100)
				.max(50000)
				.step(100)
				.onFinishChange(this.generateParticles)
		}
	}

	update() {
		this.particleMaterial.uniforms.uTime.value = this.time.elapsed / 10000
		this.particleMaterial.uniforms.uSize.value = Math.abs(
			Math.sin(this.time.elapsed / 10000) * 30
		)
	}
}
