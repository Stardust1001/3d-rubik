
const rubik = (() => {
	const COLORS = {
		red: new BABYLON.Color3(1, 0, 0),
		orange: new BABYLON.Color3(0.95, 0.56, 0.07),
		green: new BABYLON.Color3(0, 1, 0),
		blue: new BABYLON.Color3(0, 0, 1),
		white: new BABYLON.Color3(1, 1, 1),
		yellow: new BABYLON.Color3(1, 1, 0),
		black: new BABYLON.Color3(0.3, 0.3, 0.3)
	};

	const _calcCubeFaceColors = (x, y, z, levels) => {
		const max = Math.floor(levels / 2);
		const colors = { ...COLORS };
		if (x < max) colors.green = COLORS.black;
		if (x > -max) colors.blue = COLORS.black;
		if (y < max) colors.white = COLORS.black;
		if (y > -max) colors.yellow = COLORS.black;
		if (z < max) colors.orange = COLORS.black;
		if (z > -max) colors.red = COLORS.black;

		return Object.values(colors);
	};

	class Cube {

		constructor (x, y, z, size, scene, isEven, levels) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.size = size;
			this.name = `Cube(${x}, ${y}, ${z})`;
			this.box = BABYLON.MeshBuilder.CreateBox(this.name, {
				size,
				faceColors: _calcCubeFaceColors(x, y, z, levels)
			}, scene);

			if (isEven) {
				const halfSize = size / 2 + 0.5;
				this.box.position = new BABYLON.Vector3(
					x * size + x + halfSize * (x > 0 ? -1 : 1),
					y * size + y + halfSize * (y > 0 ? -1 : 1),
					-z * size - z + halfSize * (z > 0 ? 1 : -1)
				);
			} else {
				this.box.position = new BABYLON.Vector3(x * size + x, y * size + y, -z * size - z);
			}
		}
	}

	const createCubes = (scene, levels) => {
		const cubes = [];

  		const max = Math.floor(levels / 2);
  		const min = -max;
  		const isEven = levels % 2 === 0;
  		for (let i = min; i <= max; i++) {
  			for (let j = min; j <= max; j++) {
  				for (let k = min; k <= max; k++) {
  					if (isEven && (i * j * k === 0)) {
  						continue;
  					}
  					if ((i > min && i < max) && (j > min && j < max) && (k > min &&  k < max)) {
  						continue;
  					}
  					const cube = new Cube(i, j, k, window.game.size, scene, isEven, levels);
					cubes.push(cube);
  				}
  			}
  		}

		return cubes;
	};

	return {
		COLORS,
		Cube,
		createCubes
	};
})();
