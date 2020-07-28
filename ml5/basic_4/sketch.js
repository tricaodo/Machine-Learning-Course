let mobilenet;
let predictor;
let video;
let loadButton;
let value = 0;


function mobileReady() {
    console.log("Mobile is ready");
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        value = results.value;
        predictor.predict(gotResult);
    }
}

function imageReady() {
    console.log("Image is ready");
}

function videoReady() {
    console.log("Video is ready");
}

function modelReady() {
    console.log("Model is ready");
    predictor.predict(gotResult);
}


function setup() {
    createCanvas(640, 550);
    video = createCapture(VIDEO, imageReady);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor("MobileNet", mobileReady);
    predictor = mobilenet.regression(video, videoReady)

    loadButton = createButton("Load Model");
    loadButton.mousePressed(function () {
        predictor.load("model.json", modelReady);
    })
}

function draw() {
    background(0);
    image(video, 0, 0, width, height - 50);

    rectMode(CENTER);
    fill(255, 0, 200);
    rect(value * width, height / 2, 15, 30)

    textSize(40);
    text(value, 10, height - 10);
    fill(255);
}