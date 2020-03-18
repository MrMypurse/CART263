"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let scale = 20;
let w = 1000;
let h = 1000;
let cols = w/scale;
let rows = h/scale;
let terrainZ = [];
let noiseScale;

// preload()
//
// Description of preload
function preload() {
}

// setup()
//
// Description of setup
function setup() {
  createCanvas(1000, 800, WEBGL);
  resizeCanvas(width, height);
  background(0);
  stroke(255);
  noFill();
  terrainZ = [cols][rows];
  for(let y = 0; y < rows; y++){
  for (let x = 0; x < cols; x++){
    terrainZ[x][y] = random(10,-10);
  }
}
}

// draw()
//
// Description of draw()
function draw() {
  rotateX(PI/3);
  translate(-w/2, -h/4);

  for(let y = 0; y < rows; y++){
    beginShape(TRIANGLE_STRIP);
  for (let x = 0; x < cols; x++){
    vertex(x * scale, y * scale);
    vertex(x * scale, (y + 1)* scale);
    }
    endShape();
    }
  }
