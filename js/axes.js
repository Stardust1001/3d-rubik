
const axes = (() => {
	let xAxis = null;
	let yAxis = null;
	let zAxis = null;

	const createAxes = (scene, axisLength) => {
		const origin = new BABYLON.Vector3.Zero();

		const arrowWidth = Math.floor(axisLength * 0.95);
		const arrowHeight = Math.floor(axisLength * 0.05);

		const xAxisEnd = new BABYLON.Vector3(axisLength, 0, 0);
		const xAxisArrowTop = new BABYLON.Vector3(arrowWidth, arrowHeight, 0);
		const xAxisArrowBottom = new BABYLON.Vector3(arrowWidth, -arrowHeight, 0);

		const yAxisEnd = new BABYLON.Vector3(0, axisLength, 0);
		const yAxisArrowTop = new BABYLON.Vector3(0, arrowWidth, arrowHeight);
		const yAxisArrowBottom = new BABYLON.Vector3(0, arrowWidth, -arrowHeight);

		const zAxisEnd = new BABYLON.Vector3(0, 0, axisLength);
		const zAxisArrowTop = new BABYLON.Vector3(0, arrowHeight, arrowWidth);
		const zAxisArrowBottom = new BABYLON.Vector3(0, -arrowHeight, arrowWidth);

		const xAxis = BABYLON.Mesh.CreateLines('xAxis', [origin, xAxisEnd, xAxisArrowTop, xAxisEnd, xAxisArrowBottom], scene);
		const yAxis = BABYLON.Mesh.CreateLines('yAxis', [origin, yAxisEnd, yAxisArrowTop, yAxisEnd, yAxisArrowBottom], scene);
		const zAxis = BABYLON.Mesh.CreateLines('zAxis', [origin, zAxisEnd, zAxisArrowTop, zAxisEnd, zAxisArrowBottom], scene);

		xAxis.color = new BABYLON.Color3(1, 0, 0);
		yAxis.color = new BABYLON.Color3(0, 1, 0);
		zAxis.color = new BABYLON.Color3(0, 0, 1);

		return { xAxis, yAxis, zAxis }
	};

	const showAxes = (scene, axisLength) => {
		if (xAxis === null) {
			const result = createAxes(scene, axisLength);
			xAxis = result.xAxis;
			yAxis = result.yAxis;
			zAxis = result.zAxis;
		} else {
			xAxis.isVisible = yAxis.isVisible = zAxis.isVisible = true;
		}
	};

	const hideAxes = () => {
		if (xAxis !== null) {
			xAxis.isVisible = yAxis.isVisible = zAxis.isVisible = false;
		}
	};

	return {
		xAxis,
		yAxis,
		zAxis,
		showAxes,
		hideAxes
	};
})();
