
const createLights = (scene) => {
	const light1 = new BABYLON.HemisphericLight('top-light', new BABYLON.Vector3(2, 1, 1), scene);
	const light2 = new BABYLON.HemisphericLight('bottom-light', new BABYLON.Vector3(-2, -1, -1), scene);

	return { light1, light2 };
};
