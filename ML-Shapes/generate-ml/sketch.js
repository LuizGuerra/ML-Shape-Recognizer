let circles = [];
let squares = [];
let triangs = [];

function preload() {
	for(let i = 0; i < 114; i++) {
		circles[i] = loadImage(`data/circle${nf(i, 2, 0)}.png`);
	}
	for(let i = 0; i < 97; i++) {
		squares[i] = loadImage(`data/square${nf(i, 2, 0)}.png`);
	}
	for(let i = 0; i < 89; i++) {
		triangs[i] = loadImage(`data/triangle${nf(i, 2, 0)}.png`);
	}
}

function setup() {
	createCanvas(400, 400);
	// background(0);
	// image(circles[0], 0, 0, width, height);

	let options = {
		inputs: [64, 64, 4],
		task: 'imageClassification',
		debug: true,
	};
	shapeClassifier = ml5.neuralNetwork(options);
	for (let i = 0; i < circles.length; i++) {
		shapeClassifier.addData({image: circles[i]},{label: "circle"});
	}
	for (let i = 0; i < squares.length; i++) {
		shapeClassifier.addData({image: squares[i]},{label: "square"});
	}
	for (let i = 0; i < triangs.length; i++) {
		shapeClassifier.addData({image: triangs[i]},{label: "triangle"});
	}
	shapeClassifier.normalizeData();
	shapeClassifier.train({epochs: 1000}, finished);
}

function finished() {
	console.log("==================");
	console.log("Finished training");
	console.log("==================");
	shapeClassifier.save();
}

