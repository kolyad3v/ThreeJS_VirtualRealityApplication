import * as THREE from 'three'
import Experience from '../Experience'

import gsap from 'gsap'

export default class LoadingScreen {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.loadingBarElement = document.querySelector('.loading-bar')
		this.loadingBarText = document.querySelector('.loadingText')

		this.loadingManager = new THREE.LoadingManager(
			// activate when loaded
			() => {
				window.setTimeout(() => {
					// overlay animation

					// update loading element
					this.loadingBarElement.classList.add('ended')
					this.loadingBarText.classList.add('ended')

					this.loadingBarElement.style.transform = ''
					gsap.to(this.overlayMat.uniforms.uAlpha, {
						duration: 3,
						value: 0,
						delay: 0,
					})
				}, 500)
			},
			// activate during progression
			(itemUrl, itemsLoaded, itemsTotal) => {
				// calculate progress and transform loading loadingBarElement
				const progressRatio = itemsLoaded / itemsTotal
				this.loadingBarElement.style.transform = `scaleX(${progressRatio})`
				// console.log(progressRatio)
			}
		)
	}

	addLoadScreen() {
		this.overlayGeo = new THREE.PlaneGeometry(2, 2, 1, 1)
		this.overlayMat = new THREE.ShaderMaterial({
			transparent: true,
			uniforms: {
				uAlpha: { value: 1 },
			},
			vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
			fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
        }
    `,
		})

		this.overlay = new THREE.Mesh(this.overlayGeo, this.overlayMat)
		this.scene.add(this.overlay)
	}
}
