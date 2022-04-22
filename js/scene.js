
const createScene = (canvas) => {

	const scene = new BABYLON.Scene(window.game.engine);
	scene.clearColor = new BABYLON.Color3(0.5, 0.6, 0.7);

	return scene;
};
