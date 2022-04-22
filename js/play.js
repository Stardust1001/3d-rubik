
const enablePlayCube = (scene, canvas) => {

	let mouseInfo = {
		isMoving: false,
		mesh: null,
		startX: 0,
		startY: 0,
		isHorizontal: false
	};

	canvas.addEventListener('pointerdown', (e) => {
		const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
		mouseInfo.mesh = pickInfo.pickedMesh;
		mouseInfo.startX = mouseInfo.lastX = scene.pointerX;
		mouseInfo.startY = mouseInfo.lastY = scene.pointerY;
		mouseInfo.isMoving = true;
		console.log(scene.pick(scene.pointerX, scene.pointerY).faceId)
	});

	canvas.addEventListener('pointermove', (e) => {
		const { isMoving, mesh, startX, startY } = mouseInfo;

		if (!isMoving || mesh === null) {
			return ;
		}
		const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
		if (mesh !== pickInfo.pickedMesh) {
			return ;
		}
		const { pointerX, pointerY } = scene;
		const diffX = Math.abs(startX - pointerX);
		const diffY = Math.abs(startY - pointerY);
		if (diffX > diffY && diffX > 5) {
			mouseInfo.isHorizontal = true;
			rotateHorizontal(mesh, startX, pointerX);
		}
		if (diffY > diffX && diffY > 5) {
			mouseInfo.isHorizontal = false;
			rotateVertical(mesh, startY, pointerY);
		}
	});

	function rotateHorizontal (mesh, startX, pointerX) {
		const { y } = mesh.position;
		const point = new BABYLON.Vector3(0, 50, 0);
		const axis = new BABYLON.Vector3(0, 1, 0);
		const sign = pointerX < startX ? 1 : -1;
		const angle = Math.PI / 180 * sign;

		rubik.cubes.filter((cube) => {
			return Math.abs(cube.box.position.y - y) < 25;
		}).forEach((cube) => {
			cube.box.rotateAround(point, axis, angle);
		});
	}

	function rotateVertical (mesh, startY, pointerY) {
		const { x } = mesh.position;
		const point = new BABYLON.Vector3(50, 0, 0);
		const axis = new BABYLON.Vector3(1, 0, 0);
		const sign = pointerY < startY ? 1 : -1;
		const angle = Math.PI / 180 * sign;

		rubik.cubes.filter((cube) => {
			return Math.abs(cube.box.position.x - x) < 25;
		}).forEach((cube) => {
			cube.box.rotateAround(point, axis, angle);
		});
	}

	canvas.addEventListener('pointerup', (e) => {
		mouseInfo.isMoving = false;
	});
};
