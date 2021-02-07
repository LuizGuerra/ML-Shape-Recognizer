let shapeClassifier;
let canvas;
let resultsDiv;
let inputImage;
let clearButton;


function setup() {
	canvas = createCanvas(400, 400);
	let options = {inputs: [64, 64, 4],task: 'imageClassification'};
	shapeClassifier = ml5.neuralNetwork(options);
	const modelDetails = {
		model: '../models/model-1000/model.json',
		metadata: '../models/model-1000/model_meta.json',
		weights: '../models/model-1000/model.weights.bin'
	}
	background(255);
	clearButton = createButton('clear');
	clearButton.mousePressed(function() {background(255);});
	resultsDiv = createDiv('Loading model...');
	inputImage = createGraphics(64, 64);
	shapeClassifier.load(modelDetails, modelLoaded);
}

function modelLoaded() {
	console.log("Model Loaded!");
	classifyImage();
}

function classifyImage() {
	inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64);
	// image(input, 0, 0);
	shapeClassifier.classify({image: inputImage}, gotResults);
}

function gotResults(err, results) {
	if (err) { return console.log(err); }
	let label = results[0].label;
	let confidence = nf(100*results[0].confidence, 2, 0);
	resultsDiv.html(`${label} ${confidence}%`);
	classifyImage();
}

function draw() {
	strokeWeight(5);
	if (mouseIsPressed) {
		line(mouseX, mouseY, pmouseX, pmouseY);
	}
}
