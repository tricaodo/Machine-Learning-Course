let mobilenet;
let video;
let label = "";

function mobileReady() {
    console.log("Mobile is ready");
    mobilenet.predict(gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        label = results[0].label;
        mobilenet.predict(gotResult);
    }
}

function imageReady() {
    // image(puffin, 0, 0, width, height);
    console.log("Image is ready");
}

function setup() {
    video = createCapture(VIDEO, imageReady);
    video.hide();
    mobilenet = ml5.imageClassifier("MobileNet", video, mobileReady);
    createCanvas(640, 550);
    background(0);
}

function draw() {
    background(0);
    image(video, 0, 0, width, height - 50);
    textSize(40);
    text(label, 10, height - 10);
    fill(255);
}