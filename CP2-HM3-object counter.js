// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/zXxrhVYz/model.json';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
// Class
let Class0 = 'Relx';
let Class1 = 'Green  Tea';
//Score
var c0;
var c1;
var cE;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
}

function setup() {
  createCanvas(480, 300);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  
  c0 = 0;
  c1 = 0;
  cE = 0;
  
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 3, height - 20);
  
  //Score Place
  fill (120,120,0);
  text(Class0, width-75, height - 200);
  text( c0 , width-75, height - 180);
  text(Class1, width-75, height - 160);
  text( c1 , width-75, height - 140);

}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
  
  
  if (label == "Empty") {
    cE = 1;
  }
  
  if (label == Class0 && cE == 1) {
    c0 ++;
    cE = 0;
  }
  
  if (label == Class1 && cE == 1) {
    c1 ++;
    cE = 0;
  }
  
  
}
