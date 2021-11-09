// STANDARD LIBRARY/ENVIRONMENT OF BLISP
// TODO: Test each env function
import * as util from "./util.js";

const env = {
	// arithmetic
	// nums: array
	"+": (nums) => {
		if (!nums) return 0;
		return nums.reduce((prev, curr) => prev + curr, 0);
	},
	// nums: array
	"*": (nums) => {
		if (!nums) return 1;
		return nums.reduce((prev, curr) => prev * curr, 1);
	},
	"-": (nums) => {
		if (!nums) return 0;
		return nums.reduce((prev, curr, index) => {
			if (index === 0) return curr;
			return prev - curr;
		}, 0);
	},

	// PREDICATES: Return true or false
	"=": (args) => {
		let length = args.length;
		if (length < 2) {
			return "Error: procedure '=' expects more than 1 argument";
		}
		for (let i = 1; i < length; ++i) {
			if (args[i - 1] !== args[i]) return false;
		}

		return true;
	},

	// greater than
	">": (args) => {
		let length = args.length;
		if (length < 2) {
			return "Error: procedure '>' expects more than 1 argument";
		}

		for (let i = 1; i < length; ++i) {
			if (args[0] < args[i]) return false;
		}

		return true;
	},
	// less than
	"<": (args) => {
		let length = args.length;
		if (length < 2) {
			return "Error: procedure '<' expects more than 1 argument";
		}

		for (let i = 1; i < length; ++i) {
			if (args[0] > args[i]) return false;
		}

		return true;
	},

	// misc
	// args: array
	debug: (args) => {
		let out = "";
		for (const element of args) {
			out += " " + element;
		}
		return out;
	},
	time: () => Date.now(),

	// CANVAS API SUPPORT
	// THIS ONLY WORKS WHEN THE CREATE.SVELTE CREATES CONTEXT
	"set-fillStyle": (args) => {
		env._ctx.fillStyle = args[0];
	},
	"set-strokeStyle": (args) => {
		env._ctx.strokeStyle = args[0];
	},
	fillRect: (args) => env._ctx.fillRect(args[0], args[1], args[2], args[3]),
	strokeRect: (args) => {
		env._ctx.strokeRect(...args);
	},
	clearRect: (args) => {
		env._ctx.clearRect(args[0], args[1], args[2], args[3]);
	},

	// CANVAS API: Drawing text
	fillText(args) {
		env._ctx.fillText(args[0], args[1], args[2], args[3]);
	},
	strokeText(args) {
		env._ctx.strokeText(args[0], args[1], args[2], args[3]);
	},
	measureText(args) {
		return env._ctx.measureText(args[0]);
	},

	// CANVAS API: Line Styling
	"set-lineWidth": (args) => {
		env._ctx.lineWidth = args[0];
	},
	"set-lineCap": (args) => {
		env._ctx.lineCap = args[0];
	},
	"set-lineJoin": (args) => {
		env._ctx.lineJoin = args[0];
	},
	"get-lineDash": (args) => {
		return env._ctx.getLineDash();
	},
	"set-lineDash": (args) => {
		env._ctx.setLineDash(args[0]);
	},
	"set-lineDashOffset": (args) => {
		env._ctx.lineDashOffset = args[0];
	},

	// CANVAS API: TEXT STYLES
	"set-font": (args) => {
		env._ctx.font = args[0];
	},
	"set-textAlign": (args) => {
		env._ctx.textAlign = args[0];
	},
	"set-textBaseline": (args) => {
		env._ctx.textAlign = args[0];
	},
	"set-text-direction": (args) => {
		env._ctx.direction = args[0];
	},

	// CANVAS API: PATHS
	beginPath: (args) => {
		env._ctx.beginPath();
	},
	closePath: (args) => {
		env._ctx.closePath();
	},
	moveTo: (args) => {
		// move to x y
		env._ctx.moveTo(...args);
	},
	lineTo: (args) => {
		// draw a line to x y from current position
		env._ctx.lineTo(...args);
	},
	bezierCurveTo: (args) => {
		// cp (control point)
		// x (x coordinate)
		// y (y coordinate)
		// cp1x cp1y, cp2x, cp2y, x, y
		env._ctx.bezierCurveTo(...args);
	},
	quadraticCurveTo: (args) => {
		// cp (control point)
		// x (x coordinate)
		// y (y coordinate)
		env._ctx.quadraticCurveTo(...args);
	},
	arc: (args) => {
		// x (x coordinate)
		// y (y coordinate)
		// radius
		// startAngle
		// endAngle
		env._ctx.arc(...args);
	},
	arcTo: (args) => {
		// x1 (x coordinate)
		// y1 (y coordinate)
		// x2 (x coordinate)
		// y2 (y coordinate)
		// radius
		env._ctx.arcTo(...args);
	},
	ellipse: (args) => {
		// x (x coordinate)
		// y (y coordinate)
		// radiusX
		// radiusY
		// rotation
		// startAngle
		// endAngle
		env._ctx.ellipse(...args);
	},
	rectangle: (args) => {
		// x (x coordinate)
		// y (y coordinate)
		// width
		// height
		env._ctx.rect(...args);
	},

	// CANVAS API: Drawing Paths
	fill: (args) => {
		env._ctx.fill();
	},
	stroke: (args) => {
		env._ctx.stroke();
	},
	clip: (args) => {
		env._ctx.clip(...args);
	},
	isPointInPath: (args) => {
		return env._ctx.isPointInPath();
	},
	isPointInStroke: (args) => {
		return env._ctx.isPointInStroke();
	},

	// BLISP API -------------------
	// ARGS:
	//		CONTEXT: STRING ("grid")
	context: null, // context defines a number of available functionality to be used by the creator
	"set-context": (args) => {
		console.log(args);
		let size = args[1];
		util.drawGrid(env._ctx, size);
	},
	clear: () => {
		env._ctx.clearRect(0, 0, env._width, env._height);
		return "cleared";
	},
};

export default env;
