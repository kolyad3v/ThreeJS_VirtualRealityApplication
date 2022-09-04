export default [
	{
		name: 'environmentMapTexture',
		type: 'cubeTexture',
		path: [
			'textures/environmentMap/px.jpg',
			'textures/environmentMap/nx.jpg',
			'textures/environmentMap/py.jpg',
			'textures/environmentMap/ny.jpg',
			'textures/environmentMap/pz.jpg',
			'textures/environmentMap/nz.jpg',
		],
	},
	{
		name: 'model',
		type: 'gltfModel',
		path: 'models/headset.glb',
	},
	{
		name: 'baked',
		type: 'texture',
		path: 'textures/bakes/baked.jpg',
	},
	{
		name: 'doubleClick',
		type: 'gltfModel',
		path: 'models/doubleclick.glb',
	},
	{
		name: 'clickDrag',
		type: 'gltfModel',
		path: 'models/click.glb',
	},
	{
		name: 'nick',
		type: 'gltfModel',
		path: 'models/nick.glb',
	},
	{
		name: 'sam',
		type: 'gltfModel',
		path: 'models/sam.glb',
	},

	// Sam Projects
	{
		name: 'tiles',
		type: 'gltfModel',
		path: 'models/tiles/tiles.glb',
	},
]
