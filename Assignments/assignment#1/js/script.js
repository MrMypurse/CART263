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
  for (var i = 0; i < 1300; i++) {
    let pixel = document.createElement('div');
    pixel.setAttribute('class', 'pixel');
    document.body.appendChild(pixel);
    pixel.addEventListener('mouseover', paint);
  }

}

function paint(e) {
  let pixel = e.target;
  let r = Math.floor(Math.random()*356);
  let g = Math.floor(Math.random()*356);
  let b = Math.floor(Math.random()*356);
  pixel.style.backgroundColor = "rgb:${r}${g}${b}";
  setTimeout(resetPixel, 1000, pixel);
}



function resetPixel(pixel) {
  pixel.style.backgroundColor = "black";
}
