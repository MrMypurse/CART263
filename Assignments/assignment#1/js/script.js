"use strict";

/********************************************************************

Pixel Painter
Janet Sun

This is assignment #1. The use uses mouse to draw on the black canvas.

*********************************************************************/
window.onload = setup;
let rotation = 0;


function setup() {
  console.log("Document loaded.");
  for (var i = 0; i < 1000; i++) {
    let pixel = document.createElement('div');
    pixel.setAttribute('class', 'pixel');
    document.body.appendChild(pixel);
    pixel.addEventListener('mouseover', paint);
  }
  document.addEventListener('keydown', rotate);
}

function paint(e) {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  let pixel = e.target;
  pixel.style.backgroundColor = 'white';
  setTimeout(resetPixel, 1000, pixel);
}


function resetPixel(pixel) {
  pixel.style.backgroundColor = "black";
}

function rotate(e) {
  let document = e.target;
  if (keyCode === 39){
    rotation += 1;
    document.style.transform = 'rotation(${rotation})';
  }
  if (keyCode === 37){
    rotation -= 1;
    document.style.transform = 'rotation(${rotation})';
  }

}
