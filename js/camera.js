
const createCamera = (scene) => {
	const camera = new BABYLON.ArcRotateCamera("Camera", scene);
	camera.setPosition(new BABYLON.Vector3(600, 600, -1200));
	camera.attachControl(canvas, true);

	return camera;
};
