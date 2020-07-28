let mobilenet;
let classifier;
let video;
let label = "";
let remoteButton;
let paperButton;
let trainButton;

function mobileReady() {
    console.log("Mobile is ready");
    // classifier.classify(gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        label = results[0].label;
        classifier.classify(gotResult);
    }
}

function imageReady() {
    // image(puffin, 0, 0, width, height);
    console.log("Image is ready");
}

function videoReady() {
    console.log("Video is ready");
}

function whileTraining(loss) {
    if (loss === null) {
        console.log("Training is completed");
        classifier.classify(gotResult)
    } else {
        console.log(loss)
    }
}

function setup() {
    createCanvas(640, 550);
    video = createCapture(VIDEO, imageReady);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor("MobileNet", mobileReady);
    classifier = mobilenet.classification(video, videoReady)

    remoteButton = createButton("Remote");
    remoteButton.mousePressed(function () {
        classifier.addImage("Remote");
    })

    paperButton = createButton("Paper");
    paperButton.mousePressed(function () {
        classifier.addImage("Paper");
    })

    trainButton = createButton("Train");
    trainButton.mousePressed(function () {
        classifier.train(whileTraining)
    })
}

function draw() {
    background(0);
    image(video, 0, 0, width, height - 50);
    textSize(40);
    text(label, 10, height - 10);
    fill(255);
}