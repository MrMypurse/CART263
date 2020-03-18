"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let cols;
let rows;
let scale = 20;
let w = 600;
let h = 600;

// preload()
//
// Description of preload
function preload() {

}


// setup()
//
// Description of setup

function setup() {
  createCanvas(600, 600, WEBGL);
  background(0);
  stroke(255);
  noFill();
  cols = w/scale;
  rows = h/scale;
}


// draw()
//
// Description of draw()

function draw() {
  for(let y = 0; y < rows; y++){
    beginShape(TRIANGLE_STRIP);
  for (let x = 0; x < cols; x++){
    vertex(x * scale, y * scale);
    vertex(x * scale, (y + 1)* scale);
    }
    endShape();
    }
  }
