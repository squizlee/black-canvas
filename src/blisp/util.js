import env from "./env.js";

/**
 *
 * @param {Object} ctx CANVAS CONTEXT
 * @param {Number} size DESIRED SIZE OF GRID i.e. size=10 => 10x10 grid
 */
function drawGrid(ctx, size) {
	let width = env._width;
	let height = env._height;
	ctx.fillStyle = "green";

	// draw rows
	ctx.strokeStyle = "red";
	let spacingY = height / size;
	let spacingX = width / size;
	let currentX = spacingX;
	let currentY = spacingY;
	// draw rows
	for (let i = 0; i < size; ++i) {
		ctx.beginPath();
		ctx.moveTo(0, currentY);
		ctx.lineTo(width, currentY);
		ctx.stroke();
		currentY += spacingY;
	}

	// draw columns
	for (let i = 0; i < size; ++i) {
		ctx.beginPath();
		ctx.moveTo(currentX, 0);
		ctx.lineTo(currentX, height);
		ctx.stroke();
		currentX += spacingX;
	}
}

export { drawGrid };
