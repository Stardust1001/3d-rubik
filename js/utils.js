
const utils = ((() => {
	return {
		rotateLayer (cubes, direction, sign, degree, duration = 200, frames = 30) {
			const layer = cubes.filter(cube => {
				const { position } = cube.box;
				const pd = Math.abs(position[direction]) > 1 ? position[direction] : 0;
				return Math.floor(pd / window.game.size) === sign;
			});

			const axis = new BABYLON.Vector3(0, 0, 0);
			axis[direction] = 1;
			const point = axis.clone();
			point[direction] *= 50;
			const angle = Math.PI / 180 * degree;

			const durationPerFrame = duration / frames;
			const anglePerFrame = angle / frames;

			let loops = 0;
			return new Promise((resolve) => {
				const timer = setInterval(() => {
					if (loops++ >= frames) {
						clearInterval(timer);
						resolve(true);
						return;
					}
					layer.forEach(cube => {
						cube.box.rotateAround(point, axis, anglePerFrame);
					});
				}, durationPerFrame);
			});
		},
		choice (array) {
			return array[Math.floor(Math.random() * array.length)];
		}
	}

})());
