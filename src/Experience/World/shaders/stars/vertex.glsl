			// uniform vec2 uFrequency;
			// uniform float uTime;
			uniform float uSize;
			
			attribute float aScale;

			varying vec3 vColor;
	

			void main()
			{
				
				vec4 modelPosition = modelMatrix * vec4(position, 1.0);
				vec4 viewPosition = viewMatrix * modelPosition;
				vec4 projectedPosition = projectionMatrix * viewPosition;
				gl_Position = projectedPosition;

				/*
				Size
				*/
				gl_PointSize = aScale + uSize;

				// Color 
				vColor = color;	
			} 